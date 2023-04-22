import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import ITbcRepository from '../repositories/ITbcRepository';
import Tbc from '../infra/typeorm/entities/Tbc';

type UpdateTbcRequest = {
  id: string;
  client_id: string;
  name: string;
  user: string;
  password: string;
  link: string;
  unlicensed_method: boolean;
  context_coligate_code: string;
  context_branch_code: string;
  context_education_level_code: string;
  context_system_code: string;
  context_user_code: string;
};

@injectable()
class UpdateTbcService {
  constructor(@inject('TbcRepository') private tbcRepository: ITbcRepository) {}

  public async execute({
    id,
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
  }: UpdateTbcRequest): Promise<Tbc> {
    const tbc = await this.tbcRepository.findOne(id);
    if (!tbc) {
      throw new AppError('Tbc not found');
    }

    const newTbc = Object.assign(tbc, {
      name,
      client_id,
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

    return this.tbcRepository.update(newTbc);
  }
}

export default UpdateTbcService;
