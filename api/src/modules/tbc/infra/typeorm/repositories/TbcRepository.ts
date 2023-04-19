import { Repository } from 'typeorm';

import { dataSource } from '@config/data_source';

import ITbcRepository from '@modules/tbc/repositories/ITbcRepository';
import CreateTbcDTO from '@modules/tbc/dtos/CreateTbcDTO';

import Tbc from '../entities/Tbc';

class TbcRepository implements ITbcRepository {
  private ormRepository: Repository<Tbc>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Tbc);
  }

  public async findOne(tbc_id: string): Promise<Tbc | undefined> {
    const tbc = await this.ormRepository.findOne({
      where: { id: tbc_id },
    });

    return tbc ?? undefined;
  }

  public async findAll(): Promise<Tbc[]> {
    const tbc = await this.ormRepository.find({
      order: { name: 'ASC' },
    });
    return tbc;
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

  public async update(tbc: Tbc): Promise<Tbc> {
    await this.ormRepository.save(tbc);
    return tbc;
  }

  public async delete(tbc: Tbc): Promise<void> {
    await this.ormRepository.softRemove(tbc);
  }
}

export default TbcRepository;
