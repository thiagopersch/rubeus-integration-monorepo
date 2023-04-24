import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ISentenceCategory from '../repositories/ISentenceCategory';
import SentenceCategory from '../infra/typeorm/entities/SentenceCategory';

type ShowSentenceCategoryRequest = {
  sentence_category_id: string;
};

@injectable()
class ShowSentenceCategoryService {
  constructor(
    @inject('SentenceCategoryRepository')
    private sentenceCategory: ISentenceCategory,
  ) {}

  public async execute({
    sentence_category_id,
  }: ShowSentenceCategoryRequest): Promise<SentenceCategory> {
    const sentenceCategory = await this.sentenceCategory.findOne(
      sentence_category_id,
    );
    if (!sentenceCategory) {
      throw new AppError('Sentence category not found');
    }

    return sentenceCategory;
  }
}

export default ShowSentenceCategoryService;
