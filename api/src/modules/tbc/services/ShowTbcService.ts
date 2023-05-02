import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ITbcRepository from '../repositories/ITbcRepository';
import Tbc from '../infra/typeorm/entities/Tbc';

type ShowTbcRequest = {
  tbc_id: string;
  sentence_id: string;
};

@injectable()
class ShowTbcService {
  constructor(@inject('TbcRepository') private tbcRepository: ITbcRepository) {}

  public async execute({ tbc_id, sentence_id }: ShowTbcRequest): Promise<Tbc> {
    const tbc = await this.tbcRepository.findOne(tbc_id);
    if (!tbc) {
      throw new AppError('TBC not found');
    }

    return tbc;
  }
}

export default ShowTbcService;
