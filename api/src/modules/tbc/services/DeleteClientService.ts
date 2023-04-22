import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ITbcRepository from '../repositories/ITbcRepository';

type DeleteTbcRequest = {
  tbc_id: string;
};

@injectable()
class DeleteTbcService {
  constructor(@inject('TbcRepository') private tbcRepository: ITbcRepository) {}

  public async execute({ tbc_id }: DeleteTbcRequest): Promise<void> {
    const tbc = await this.tbcRepository.findById(tbc_id);
    if (!tbc) {
      throw new AppError('TBC not found');
    }
    await this.tbcRepository.delete(tbc);
  }
}

export default DeleteTbcService;
