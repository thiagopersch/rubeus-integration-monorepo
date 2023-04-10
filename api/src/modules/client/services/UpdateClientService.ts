import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import IClientsRepository from '../repositories/IClientsRepository';
import Client from '../infra/typeorm/entities/Client';

type UpdateClientRequest = {
  id: string;
  name: string;
  status: boolean;
};

@injectable()
class UpdateClientService {
  constructor(
    @inject('ClientsRepository') private clientsRepository: IClientsRepository,
  ) {}

  public async execute({
    id,
    name,
    status,
  }: UpdateClientRequest): Promise<Client> {
    const client = await this.clientsRepository.findOne(id);
    if (client) {
      throw new AppError('Client not found');
    }

    const newClient = Object.assign([client, { name, status }]);

    return this.clientsRepository.update(newClient);
  }
}

export default UpdateClientService;
