import { inject, injectable } from 'tsyringe';

import ITbcRepository from '../repositories/ITbcRepository';
import Tbc from '../infra/typeorm/entities/Tbc';

@injectable()
class ListTbcService {
  constructor(@inject('TbcRepository') private tbcRepository: ITbcRepository) {}

  public async execute(): Promise<Tbc[]> {
    const client = await this.tbcRepository.findAll();
    return client;
  }
}

export default ListTbcService;
