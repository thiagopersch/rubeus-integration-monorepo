import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateTbcService from '@modules/tbc/services/CreateTbcService';
import ListTbcService from '@modules/tbc/services/ListTbcService';
import ShowTbcService from '@modules/tbc/services/ShowTbcService';

class TbcController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { tbc_id } = request.params;

    const showTbc = container.resolve(ShowTbcService);
    const tbc = await showTbc.execute({
      tbc_id,
    });

    return response.json(tbc);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listTbc = container.resolve(ListTbcService);
    const tbc = await listTbc.execute();

    return response.json(tbc);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      client_id,
      name,
      user,
      password,
      link,
      unlicensed_method,
      context_coligate_code,
      context_branch_code,
      context_education_level_code,
      context_system_code,
      context_user_code,
    } = request.body;

    const createTbc = container.resolve(CreateTbcService);
    const client = await createTbc.execute({
      client_id,
      name,
      user,
      password,
      link,
      unlicensed_method,
      context_coligate_code,
      context_branch_code,
      context_education_level_code,
      context_system_code,
      context_user_code,
    });

    return response.json(client);
  }

  /* public async update(request: Request, response: Response): Promise<Response> {
    const { client_id } = request.params;
    const { name, status } = request.body;

    const updateClient = container.resolve(UpdateClientService);
    const client = await updateClient.execute({
      id: client_id,
      name,
      status,
    });

    return response.json(client);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { client_id } = request.params;

    const deleteUser = container.resolve(DeleteClientService);
    await deleteUser.execute({ client_id });

    return response.status(204).send();
  } */
}

export default TbcController;
