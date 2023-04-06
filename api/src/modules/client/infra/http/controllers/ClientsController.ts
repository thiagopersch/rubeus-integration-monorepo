import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';

import CreateClientService from '@modules/client/services/CreateClientService';
import ListClientService from '@modules/client/services/ListClientService';

class ClientsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listClients = container.resolve(ListClientService);
    const clients = await listClients.execute();

    return response.json(instanceToInstance(clients));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, status } = request.body;

    const createClient = container.resolve(CreateClientService);

    const client = await createClient.execute({ name, status });

    return response.json(client);
  }

  // public async delete(request: Request, response: Response): Promise<Response> {
  //   const { user_id } = request.params;
  //   const { id: authenticated_user } = request.user;

  //   const deleteUser = container.resolve(DeleteUserService);
  //   await deleteUser.execute({ user_id, auth_user_id: authenticated_user });

  //   return response.status(204).send();
  // }
}

export default ClientsController;
