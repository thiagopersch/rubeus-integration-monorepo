import CreateClientDTO from '../dtos/CreateClientDTO';
import Client from '../infra/typeorm/entities/Client';

export default interface IClientsRepository {
  create: (data: CreateClientDTO) => Promise<Client>;
  update: (client: Client) => Promise<Client>;
  delete: (client: Client) => Promise<void>;
}
