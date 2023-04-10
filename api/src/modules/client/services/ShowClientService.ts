import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IClientsRepository from '../repositories/IClientsRepository';
import Client from '../infra/typeorm/entities/Client';

type ShowClientRequest = {
  client_id: string;
};

@injectable()
class ShowClientService {
  constructor(
    @inject('ClientsRepository') private clientsRepository: IClientsRepository,
  ) {}

  public async execute({ client_id }: ShowClientRequest): Promise<Client> {
    const client = await this.clientsRepository.findById(client_id);
    if (!client) {
      throw new AppError('Client not found');
    }

    return client;
  }
}

export default ShowClientService;
