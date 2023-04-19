import { container } from 'tsyringe';

import ClientsRepository from '@modules/client/infra/typeorm/repositories/ClientsRepository';
import IClientsRepository from '@modules/client/repositories/IClientsRepository';
import ITbcRepository from '@modules/tbc/repositories/ITbcRepository';
import TbcRepository from '@modules/tbc/infra/typeorm/repositories/TbcRepository';

container.registerSingleton<IClientsRepository>(
  'ClientsRepository',
  ClientsRepository,
);

container.registerSingleton<ITbcRepository>('TbcRepository', TbcRepository);

// container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
