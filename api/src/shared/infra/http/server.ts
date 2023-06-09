import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';

import clientsRouter from '@modules/client/infra/http/routes/clients.routes';
import tbcsRouter from '@modules/tbc/infra/http/routes/tbcs.routes';
import sessionsRouter from '@modules/session/infra/http/routes/sessions.routes';
import sentenceCategoryRouter from '@modules/sentenceCategory/infra/http/routes/sentenceCategory.routes';
import sentenceRouter from '@modules/sentence/infra/http/routes/sentence.routes';

import AppError from '../../errors/AppError';

import healthyDatasource from '../typeorm/healthy';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/healthy', async (_, res) => {
  await healthyDatasource();

  return res.json({ api: 'ok', datasource: 'ok' });
});

app.use('/clients', clientsRouter);
app.use('/tbc', tbcsRouter);
app.use('/sessions', sessionsRouter);
app.use('/sentence-category', sentenceCategoryRouter);
app.use('/sentence', sentenceRouter);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response
      .status(err.statusCode)
      .json({ status: 'error', message: err.message });
  }

  console.error(err);

  return response
    .status(500)
    .json({ status: 'error', message: 'Internal server error' });
});

export default app;
