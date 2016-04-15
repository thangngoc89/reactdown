/**
 * @copyright 2016-present, Reactdown Team
 * @flow
 */

import type {DirectiveConfig as DirectiveParseConfig} from './parse';
import type {DirectiveConfig as DirectiveRenderConfig} from './render';

import fs from 'fs';
import path from 'path';
import {parseQuery} from 'loader-utils';

export type DirectiveConfig
  = string
  | (DirectiveParseConfig & DirectiveRenderConfig);

export type DirectiveMapping = {
  [name: string]: DirectiveConfig;
};

export type Config = {
  directives: DirectiveMapping;
};

const CONFIG_FILENAME = '.reactdownrc';
const PACKAGE_FILENAME = 'package.json';

const defaultConfig = {
  directives: {},
};

export function mergeConfig(config: Config, merge: ?Config): Config {
  if (!merge) {
    return config;
  }
  return {
    ...config,
    ...merge,
    directives: {
      ...config.directives,
      ...merge.directives,
    }
  };
}

export function findConfig(loc: string): {config: Config, sourceList: Array<string>} {
  let seenConfig = false;
  let seenPackage = false;
  let config = defaultConfig;
  let sourceList = [];
  while (!(seenPackage && seenConfig) && loc !== path.dirname(loc)) {
    let configLoc = path.join(loc, CONFIG_FILENAME);
    if (fs.existsSync(configLoc)) {
      config = mergeConfig(config, readJSON(configLoc));
      sourceList.push(configLoc);
      seenConfig = true;
    }

    let pkgLoc = path.join(loc, PACKAGE_FILENAME);
    if (fs.existsSync(pkgLoc)) {
      config = mergeConfig(config, readJSON(pkgLoc)['reactdown']);
      sourceList.push(pkgLoc);
      seenPackage = true;
    }

    loc = path.dirname(loc);
  }
  return {config, sourceList};
}

export function parseConfigFromQuery(query: string): Config {
  query = parseQuery(query);
  return {
    directives: query.directives || {},
    elements: query.elements || {},
  };
}

function readJSON(loc) {
  return JSON.parse(fs.readFileSync(loc, {flag: 'r'}).toString('utf8'));
}