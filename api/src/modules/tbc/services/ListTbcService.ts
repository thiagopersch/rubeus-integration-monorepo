import { inject, injectable } from 'tsyringe';

import ITbcRepository from '../repositories/ITbcRepository';
import Tbc from '../infra/typeorm/entities/Tbc';

@injectable()
class ListTbcService {
  constructor(@inject('TbcRepository') private tbcRepository: ITbcRepository) {}

  public async execute(): Promise<Tbc[]> {
    const tbc = await this.tbcRepository.findAll();
    return tbc;
  }
}

export default ListTbcService;
