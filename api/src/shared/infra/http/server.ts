import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';

import usersRouter from '@modules/gusers/infra/http/routes/users.routes';
import userProfilesRouter from '@modules/gusers/infra/http/routes/userProfiles.routes';
import modulesRouter from '@modules/zmodules/infra/http/routes/modules.routes';
import parentageTypeRouter from '@modules/gdocuments/infra/http/routes/parentageType.routes';
import civilStatusRouter from '@modules/gdocuments/infra/http/routes/civilStatus.routes';
import colorRaceRouter from '@modules/gdocuments/infra/http/routes/colorRace.routes';
import parentageRouter from '@modules/gdocuments/infra/http/routes/parentage.routes';
import documentsRouter from '@modules/gdocuments/infra/http/routes/documents.routes';
import addressRouter from '@modules/gaddress/infra/http/routes/address.routes';
import ecclesiasticalFieldRouter from '@modules/gecclesiasticalfield/infra/http/routes/ecclesiasticalField.routes';
import appRouter from '@modules/core/infra/http/routes/app.routes';
import churchMembersRouter from '@modules/achurchmembers/infra/http/routes/churchMembers.routes';
import ebdAppRouter from '@modules/eEBD/infra/http/routes/ebdApp.routes';
import sessionsRouter from '@modules/gusers/infra/http/routes/sessions.routes';

import AppError from '@shared/errors/AppError';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/users', usersRouter);
app.use('/user-profiles', userProfilesRouter);
app.use('/modules', modulesRouter);
app.use('/parentage-type', parentageTypeRouter);
app.use('/parentage', parentageRouter);
app.use('/color-race', colorRaceRouter);
app.use('/civil-status', civilStatusRouter);
app.use('/documents', documentsRouter);
app.use('/address', addressRouter);
app.use('/ecclesiastical-field', ecclesiasticalFieldRouter);
app.use('/app', appRouter);
app.use('/church-members', churchMembersRouter);
app.use('/ebd', ebdAppRouter);
app.use('/sessions', sessionsRouter);

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
