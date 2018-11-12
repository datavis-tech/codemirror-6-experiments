import { Router } from 'express';
import { html } from './html';
import { createDom } from '../../server/dom';
import { setServerRenderedData } from '../html';
//import { Page } from './page';

const route = 'multifilePad';
const dom = createDom(html);

export const server = connection => {
  const router = Router();
  router.get('/', (req, res) => {
    setServerRenderedData(dom, { route });
    res.send(dom.serialize());
  });
  return router;
};
