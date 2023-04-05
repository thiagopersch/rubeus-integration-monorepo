import { Repository } from 'typeorm';

import { dataSource } from '@config/data_source';

import IClientsRepository from '@modules/client/repositories/IClientsRepository';

import CreateClientDTO from '@modules/client/dtos/CreateClientDTO';

import Client from '../entities/Client';

class ClientsRepository implements IClientsRepository {
  private ormRepository: Repository<Client>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Client);
  }

  public async create({ name, status }: CreateClientDTO): Promise<Client> {
    const client = this.ormRepository.create({
      name,
      status,
    });
    await this.ormRepository.save(client);

    return client;
  }

  public async update(client: Client): Promise<Client> {
    await this.ormRepository.save(client);
    return client;
  }

  public async delete(client: Client): Promise<void> {
    await this.ormRepository.softRemove(client);
  }
}

export default ClientsRepository;
