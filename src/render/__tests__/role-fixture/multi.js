import React from "react";
import DocumentContext from "reactdown/lib/DocumentContext";
import * as defaultComponents from "reactdown/lib/components";
import * as customComponents from "reactdown/lib/components";
let components = { ...defaultComponents, ...customComponents };
import { GHIssue } from "roles";
import { GHBranch } from "roles";
export default function Document() {
  return React.createElement(DocumentContext, {
    context: {
      metadata,
      model
    }
  }, React.createElement(components.Root, null, React.createElement(components.Paragraph, null, "Link to GitHub issue: ", React.createElement(GHBranch, {
    "words": ["123", "next"]
  }), "."), React.createElement(components.Paragraph, null, "Link to GitHub issue: ", React.createElement(GHIssue, {
    "words": ["123", "Important issue"]
  }), "."), React.createElement(components.Paragraph, null, "Link to GitHub issue: ", React.createElement(GHIssue, {
    "words": ["Important issue", "123"]
  }), ".")));
}
export let metadata = {};
export let model = {
  "toc": [],
  "title": null
};
