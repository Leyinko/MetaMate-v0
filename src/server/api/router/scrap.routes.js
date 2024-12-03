import express from 'express';
import { checkIt, scrapIt, thinkIt, abortIt } from '../controllers/scrap.controller.js';

const mateRouter = express.Router();

mateRouter.post('/abort', abortIt);
mateRouter.put('/ask', scrapIt);
mateRouter.get('/check/:game', checkIt);
mateRouter.get('/logs', thinkIt);

export default mateRouter;
