import { container } from 'tsyringe';

import ClientsRepository from '@modules/client/infra/typeorm/repositories/ClientsRepository';
import IClientsRepository from '@modules/client/repositories/IClientsRepository';
import ITbcsRepository from '@modules/tbc/repositories/ITbcsRepository';
import TbcsRepository from '@modules/tbc/infra/typeorm/repositories/TbcsRepository';

container.registerSingleton<IClientsRepository>(
  'ClientsRepository',
  ClientsRepository,
);

container.registerSingleton<ITbcsRepository>('TbcsRepository', TbcsRepository);

// container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
