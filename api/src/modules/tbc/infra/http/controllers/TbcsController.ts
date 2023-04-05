import CreateTbcService from '@modules/tbc/services/CreateTbcService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class TbcsController {
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

    return response.json(instanceToInstance(client));
  }
}

export default TbcsController;
