/**
 * @copyright 2016-present, Reactdown Team
 * @flow
 */

import type {
  ParseConfig,
  DirectiveConfig as DirectiveParseConfig
} from './parse';
import type {
  RenderConfig,
  DirectiveConfig as DirectiveRenderConfig,
  RoleConfig as RoleRenderConfig,
  ModelConfig as ModelRenderConfig
} from './render';

import fs from 'fs';
import path from 'path';
import JSON5 from 'json5';
import {parseQuery} from 'loader-utils';

import * as model from './model';
import * as ComponentRef from './ComponentRef';

export type ModelConfig
  // $FlowIssue: report it
  = {[attribute: string]: string}
  | ModelRenderConfig;

export type DirectiveConfig = $Shape<{
  render: DirectiveRenderConfig;
  parse: DirectiveParseConfig;
}>;

export type RoleConfig = RoleRenderConfig;

export type DirectiveMapping = {
  [name: string]: DirectiveConfig;
};

export type RoleMapping = {
  [name: string]: RoleConfig;
};

export type CompleteConfig = {
  components: string;
  directives: DirectiveMapping;
  roles: RoleMapping;
  model: ModelConfig;
};

export type Config = $Shape<CompleteConfig>;

const CONFIG_FILENAME = '.reactdownrc';
const PACKAGE_FILENAME = 'package.json';

export const defaultConfig: CompleteConfig = {
  components: 'reactdown/lib/components',
  directives: {},
  roles: {},
  model: model,
};

export function mergeConfig(config: CompleteConfig, merge: ?Config): CompleteConfig {
  if (!merge) {
    return config;
  }
  return {
    ...config,
    ...merge,
    directives: {
      ...config.directives,
      ...merge.directives,
    },
    roles: {
      ...config.roles,
      ...merge.roles,
    },
    model: {
      ...config.model,
      ...merge.model,
    },
  };
}

export function findConfig(loc: string): {config: CompleteConfig, sourceList: Array<string>} {
  let seenConfig = false;
  let seenPackage = false;
  let config = defaultConfig;
  let sourceList = [];
  while (!(seenPackage && seenConfig) && loc !== path.dirname(loc)) {
    let configLoc = path.join(loc, CONFIG_FILENAME);
    if (fs.existsSync(configLoc)) {
      config = mergeConfig(config, readJSON(configLoc, JSON5));
      sourceList.push(configLoc);
      seenConfig = true;
    }

    let pkgLoc = path.join(loc, PACKAGE_FILENAME);
    if (fs.existsSync(pkgLoc)) {
      config = mergeConfig(config, readJSON(pkgLoc, JSON)['reactdown']);
      sourceList.push(pkgLoc);
      seenPackage = true;
    }

    loc = path.dirname(loc);
  }
  return {config, sourceList};
}

export function parseConfigFromQuery(query: string): Config {
  let config = {};
  query = parseQuery(query);
  if (query.directives) {
    config.directives = query.directives;
  }
  if (query.roles) {
    config.roles = query.roles;
  }
  if (query.components) {
    config.components = query.components;
  }
  return config;
}

export function toRenderConfig(config: CompleteConfig): RenderConfig {
  let renderConfig = {
    components: config.components,
    directives: mapObject(config.directives, config => config.render),
    roles: config.roles,
    model: mapObject(config.model, analyzer => {
      if (typeof analyzer === 'string') {
        return ComponentRef.resolve(analyzer);
      } else {
        return analyzer;
      }
    }),
  };
  return renderConfig;
}

export function toParseConfig(config: CompleteConfig): ParseConfig {
  let parseConfig = {
    directives: mapObject(config.directives, config => config.parse),
  };
  return parseConfig;
}

function readJSON(loc, syntax = JSON) {
  return syntax.parse(fs.readFileSync(loc, {flag: 'r'}).toString('utf8'));
}

function mapObject<V1, V2>(object: {[k: string]: V1}, map: (v: V1) => V2): {[k: string]: V2} {
  let result = {};
  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      let value = map(object[key]);
      if (value !== undefined) {
        result[key] = value;
      }
    }
  }
  return result;
}
