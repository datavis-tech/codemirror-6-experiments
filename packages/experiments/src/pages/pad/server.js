import { Router } from 'express';
import { hydrateEditor } from './hydrateEditor';
import { createView } from './demoView';
import { html } from './html';
import { setServerRenderedData } from '../html';
import { createDom } from '../../server/dom';
import { getOrCreateDoc } from '../../server/getOrCreateDoc';

const dom = createDom(html);

export const server = connection => {
  const router = Router();
  router.get('/:id', (req, res) => {
    getOrCreateDoc(connection).then(doc => {
      global.document = dom.window.document;
      const text = doc.data;
      hydrateEditor(createView({ text }));

      // Make the content non-interactive until the JS loads.
      // Otherwise edits made before JS loads will be lost.
      document.querySelector('.CodeMirror-content').removeAttribute('contenteditable');

      const snapshot = {
        v: doc.version,
        data: doc.data
      };

      setServerRenderedData(dom, {
        route: 'pad',
        params: req.params,
        snapshot
      });

      res.send(dom.serialize());
      doc.destroy();
    });
  });
  return router;
};