import { inject, injectable } from 'tsyringe';

import Client from '../infra/typeorm/entities/Client';
import IClientsRepository from '../repositories/IClientsRepository';

@injectable()
class ListClientService {
  constructor(
    @inject('ClientsRepository') private clientsRepository: IClientsRepository,
  ) {}

  public async execute(): Promise<Client[]> {
    const client = await this.clientsRepository.findAll();
    return client;
  }
}

export default ListClientService;
