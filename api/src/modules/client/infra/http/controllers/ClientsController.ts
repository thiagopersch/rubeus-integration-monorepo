import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';

import CreateClientService from '@modules/client/services/CreateClientService';
import ListClientService from '@modules/client/services/ListClientService';
import UpdateClientService from '@modules/client/services/UpdateClientService';
import ShowClientService from '@modules/client/services/ShowClientService';
import DeleteClientService from '@modules/client/services/DeleteClientService';

class ClientsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { client_id } = request.params;

    const showClient = container.resolve(ShowClientService);
    const client = await showClient.execute({
      client_id,
    });

    return response.json(client);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listClients = container.resolve(ListClientService);
    const clients = await listClients.execute();

    return response.json(clients);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, link_crm, status } = request.body;

    const createClient = container.resolve(CreateClientService);
    const client = await createClient.execute({ name, link_crm, status });

    return response.json(client);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { client_id } = request.params;
    const { name, link_crm, status } = request.body;

    const updateClient = container.resolve(UpdateClientService);
    const client = await updateClient.execute({
      id: client_id,
      name,
      link_crm,
      status,
    });

    return response.json(client);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { client_id } = request.params;

    const deleteUser = container.resolve(DeleteClientService);
    await deleteUser.execute({ client_id });

    return response.status(204).send();
  }
}

export default ClientsController;
