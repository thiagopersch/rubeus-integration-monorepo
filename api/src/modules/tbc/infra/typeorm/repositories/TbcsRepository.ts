import { Repository } from 'typeorm';

import { dataSource } from '@config/data_source';

import ITbcsRepository from '@modules/tbc/repositories/ITbcsRepository';
import CreateTbcDTO from '@modules/tbc/dtos/CreateTbcDTO';

import Tbc from '../entities/Tbc';

class TbcsRepository implements ITbcsRepository {
  private ormRepository: Repository<Tbc>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Tbc);
  }

  public async create({
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
  }: CreateTbcDTO): Promise<Tbc> {
    const tbc = this.ormRepository.create({
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
    await this.ormRepository.save(tbc);
    return tbc;
  }
}

export default TbcsRepository;
