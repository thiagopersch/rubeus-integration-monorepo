import { inject, injectable } from 'tsyringe';

import Client from '../infra/typeorm/entities/Client';
import IClientsRepository from '../repositories/IClientsRepository';

type CreateClientRequest = {
  name: string;
  link_crm: string;
  status: boolean;
};

@injectable()
class CreateClientService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  public async execute({
    name,
    link_crm,
    status,
  }: CreateClientRequest): Promise<Client> {
    const client = await this.clientsRepository.create({
      name,
      link_crm,
      status,
    });
    return client;
  }
}

export default CreateClientService;
