import { container } from 'tsyringe';

import ClientsRepository from '@modules/client/infra/typeorm/repositories/ClientsRepository';
import IClientsRepository from '@modules/client/repositories/IClientsRepository';
import ITbcRepository from '@modules/tbc/repositories/ITbcRepository';
import TbcRepository from '@modules/tbc/infra/typeorm/repositories/TbcRepository';
import ISentenceCategory from '@modules/sentenceCategory/repositories/ISentenceCategory';
import SentenceCategoryRepository from '@modules/sentenceCategory/infra/typeorm/repositories/SentenceCategoryRepository';

container.registerSingleton<IClientsRepository>(
  'ClientsRepository',
  ClientsRepository,
);

container.registerSingleton<ITbcRepository>('TbcRepository', TbcRepository);

container.registerSingleton<ISentenceCategory>(
  'SentenceCategoryRepository',
  SentenceCategoryRepository,
);

// container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
