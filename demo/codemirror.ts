export {EditorState, EditorSelection} from "../codemirror.next/state/src"
export {EditorView} from "../codemirror.next/view/src/"
export {keymap} from "../codemirror.next/keymap/src/keymap"
export {history, redo, redoSelection, undo, undoSelection} from "../codemirror.next/history/src/history"
export {gutter} from "../codemirror.next/gutter/src/index"
export {baseKeymap} from "../codemirror.next/commands/src/commands"
export {legacyMode} from "../codemirror.next/legacy-modes/src/index"
export {matchBrackets} from "../codemirror.next/matchbrackets/src/matchbrackets"
export {specialChars} from "../codemirror.next/special-chars/src/special-chars"
export {multipleSelections} from "../codemirror.next/multiple-selections/src/multiple-selections"

import javascript from "../codemirror.next/legacy-modes/src/javascript"
export { javascript }

export function crudeInsertNewlineAndIndent({state, dispatch}: EditorView): boolean {
  let indentation = (mode as any).indentation(state, state.selection.primary.from)
  if (indentation > -1)
    dispatch(state.transaction.replaceSelection("\n" + " ".repeat(indentation)).scrollIntoView())
  return true
}

export function crudeIndentLine({state, dispatch}: EditorView): boolean {
  let cursor = state.selection.primary.head // FIXME doesn't indent multiple lines
  let line = state.doc.lineAt(cursor), text = line.slice(0, 100)
  let space = /^ */.exec(text)[0].length // FIXME doesn't handle tabs
  let indentation = (mode as any).indentation(state, line.start)
  if (indentation == -1) indentation = space
  let tr = state.transaction.replace(line.start, line.start + space, " ".repeat(indentation)).scrollIntoView()
  if (cursor <= line.start + space)
    tr = tr.setSelection(EditorSelection.single(line.start + indentation))
  dispatch(tr)
  return true
}
