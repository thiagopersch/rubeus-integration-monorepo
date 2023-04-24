import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ISentenceCategory from '../repositories/ISentenceCategory';
import SentenceCategory from '../infra/typeorm/entities/SentenceCategory';

type UpdateSentenceCategoryRequest = {
  id: string;
  name: string;
  description: string;
  status: boolean;
};

@injectable()
class UpdateSentenceCategoryService {
  constructor(
    @inject('SentenceCategoryRepository')
    private sentenceCategory: ISentenceCategory,
  ) {}

  public async execute({
    id,
    name,
    description,
    status,
  }: UpdateSentenceCategoryRequest): Promise<SentenceCategory> {
    const sentenceCategory = await this.sentenceCategory.findOne(id);
    if (!sentenceCategory) {
      throw new AppError('Sentence category not found');
    }

    const newSentenceCategory = Object.assign(sentenceCategory, {
      name,
      description,
      status,
    });

    return this.sentenceCategory.update(newSentenceCategory);
  }
}

export default UpdateSentenceCategoryService;
