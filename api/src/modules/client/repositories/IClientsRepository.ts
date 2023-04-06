import CreateClientDTO from '../dtos/CreateClientDTO';

import Client from '../infra/typeorm/entities/Client';

export default interface IClientsRepository {
  findById: (clientId: string) => Promise<Client | undefined>;
  findAll: () => Promise<Client[]>;
  create: (data: CreateClientDTO) => Promise<Client>;
  update: (client: Client) => Promise<Client>;
  delete: (client: Client) => Promise<void>;
}
