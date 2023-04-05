import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateClientService from '@modules/client/services/CreateClientService';

class ClientsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, status } = request.body;

    const createClient = container.resolve(CreateClientService);

    const client = await createClient.execute({ name, status });

    return response.json(client);
  }
}

export default ClientsController;
