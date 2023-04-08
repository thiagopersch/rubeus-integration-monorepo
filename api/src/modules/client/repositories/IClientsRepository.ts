import CreateClientDTO from '../dtos/CreateClientDTO';
import FindClientDTO from '../dtos/FindClientDTO';

import Client from '../infra/typeorm/entities/Client';

export default interface IClientsRepository {
  findById: (client_id: string) => Promise<Client | undefined>;
  // findByOne: (filters?: FindClientDTO) => Promise<Client | undefined>;
  findAll: (filters?: FindClientDTO) => Promise<Client[]>;
  create: (data: CreateClientDTO) => Promise<Client>;
  update: (client: Client) => Promise<Client>;
  delete: (client: Client) => Promise<void>;
}
