import {
  history,
  EditorState,
  EditorSelection
  EditorView,
  keymap,
  gutter,
  baseKeymap,
  legacyMode,
  matchBrackets,
  javascript,
  specialChars,
  multipleSelections
} from 'codemirror-6';
import { historyKeymap } from './historyKeymap';
import { indentationKeymap } from './indentationKeymap';
import { experimentPlugin } from './experimentPlugin';

let mode = legacyMode(javascript({indentUnit: 2}, {}))
let state = EditorState.create({doc: `"use strict";
const {readFile} = require("fs");

readFile("package.json", "utf8", (err, data) => {
  console.log(data);
});`, plugins: [
  gutter(),
  history(),
  specialChars({}),
  multipleSelections(),
  mode,
  matchBrackets({decorationsPlugin: mode}),
  keymap(historyKeymap()),
  keymap(indentationKeymap(mode)),
  keymap(baseKeymap),
  experimentPlugin
]})

let view = (window as any).view = new EditorView(state)
document.querySelector("#editor").appendChild(view.dom)
