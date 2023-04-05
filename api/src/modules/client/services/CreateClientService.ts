import { inject, injectable } from 'tsyringe';

import Client from '../infra/typeorm/entities/Client';
import IClientsRepository from '../repositories/IClientsRepository';

type CreateClientRequest = {
  name: string;
  status: boolean;
};

@injectable()
class CreateClientService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  public async execute({ name, status }: CreateClientRequest): Promise<Client> {
    const client = await this.clientsRepository.create({ name, status });
    return client;
  }
}

export default CreateClientService;
