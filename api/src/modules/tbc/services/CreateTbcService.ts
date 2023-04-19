import { inject, injectable } from 'tsyringe';
import Tbc from '../infra/typeorm/entities/Tbc';
import ITbcRepository from '../repositories/ITbcRepository';

type CreateTbcResquest = {
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
class CreateTbcService {
  constructor(@inject('TbcRepository') private tbcRepository: ITbcRepository) {}

  public async execute({
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
  }: CreateTbcResquest): Promise<Tbc> {
    const tbc = await this.tbcRepository.create({
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
    return tbc;
  }
}
export default CreateTbcService;
