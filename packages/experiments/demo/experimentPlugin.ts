import { Plugin, EditorView, EditorState, Transaction } from './codemirror';

export const experimentPlugin = new Plugin({
  view: (view: EditorView) => {

    // Inject programmatically created transactions,
    // from remote OT operations.
    setTimeout(() => {
      console.log('dispatching');
      view.dispatch(view.state.transaction.replace(1, 2, "*"))
    }, 2000);

    return {
      // Listen for all transactions,
      // so they can be converted to OT operations.
      updateState(view: EditorView, prev: EditorState, trs: Transaction[]) {
        console.log(trs);
      }
    };
  })
});
