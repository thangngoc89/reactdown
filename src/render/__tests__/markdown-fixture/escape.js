import React from "react";
import DocumentContext from "reactdown/lib/DocumentContext";
import * as defaultElements from "reactdown/lib/elements";
import * as customElements from "reactdown/lib/elements";
let elements = { ...defaultElements, ...customElements };
export default function Document() {
  return React.createElement(DocumentContext, {
    context: {
      metadata,
      model
    }
  }, React.createElement(elements.Root, null, React.createElement(elements.Paragraph, null, "These should all get escaped:"), React.createElement(elements.Paragraph, null, "Backslash: ", "\\"), React.createElement(elements.Paragraph, null, "Backtick: ", "`"), React.createElement(elements.Paragraph, null, "Asterisk: ", "*"), React.createElement(elements.Paragraph, null, "Underscore: ", "_"), React.createElement(elements.Paragraph, null, "Left brace: ", "{"), React.createElement(elements.Paragraph, null, "Right brace: ", "}"), React.createElement(elements.Paragraph, null, "Left bracket: ", "["), React.createElement(elements.Paragraph, null, "Right bracket: ", "]"), React.createElement(elements.Paragraph, null, "Left paren: ", "("), React.createElement(elements.Paragraph, null, "Right paren: ", ")"), React.createElement(elements.Paragraph, null, "Greater-than: ", ">"), React.createElement(elements.Paragraph, null, "Hash: ", "#"), React.createElement(elements.Paragraph, null, "Period: ", "."), React.createElement(elements.Paragraph, null, "Bang: ", "!"), React.createElement(elements.Paragraph, null, "Plus: ", "+"), React.createElement(elements.Paragraph, null, "Minus: ", "-"), React.createElement(elements.Paragraph, null, React.createElement(elements.Strong, null, "GFM:")), React.createElement(elements.Paragraph, null, "Pipe: ", "|"), React.createElement(elements.Paragraph, null, "Tilde: ", "~"), React.createElement(elements.Paragraph, null, React.createElement(elements.Strong, null, "Commonmark:")), React.createElement(elements.Paragraph, null, "Quote: \\\""), React.createElement(elements.Paragraph, null, "Dollar: \\$"), React.createElement(elements.Paragraph, null, "Percentage: \\%"), React.createElement(elements.Paragraph, null, "Ampersand: \\&"), React.createElement(elements.Paragraph, null, "Single quote: \\'"), React.createElement(elements.Paragraph, null, "Comma: \\,"), React.createElement(elements.Paragraph, null, "Forward slash: \\/"), React.createElement(elements.Paragraph, null, "Colon: \\:"), React.createElement(elements.Paragraph, null, "Semicolon: \\;"), React.createElement(elements.Paragraph, null, "Less-than: \\<"), React.createElement(elements.Paragraph, null, "Equals: \\="), React.createElement(elements.Paragraph, null, "Question mark: \\?"), React.createElement(elements.Paragraph, null, "At-sign: \\@"), React.createElement(elements.Paragraph, null, "Caret: \\^"), React.createElement(elements.Paragraph, null, "New line: \\\nonly works in paragraphs."), React.createElement(elements.Paragraph, null, "Two spaces:", React.createElement(elements.Break, null), "only works in paragraphs.")));
}
export let metadata = {};
export let model = {
  "toc": [],
  "title": null
};
