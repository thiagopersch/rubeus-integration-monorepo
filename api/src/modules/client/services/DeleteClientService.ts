import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IClientsRepository from '../repositories/IClientsRepository';

type DeleteClientRequest = {
  client_id: string;
};

@injectable()
class DeleteClientService {
  constructor(
    @inject('ClientsRepository') private clientsRepository: IClientsRepository,
  ) {}

  public async execute({ client_id }: DeleteClientRequest): Promise<void> {
    const client = await this.clientsRepository.findById(client_id);
    if (!client) {
      throw new AppError('Client not found');
    }
    await this.clientsRepository.delete(client);
  }
}

export default DeleteClientService;
