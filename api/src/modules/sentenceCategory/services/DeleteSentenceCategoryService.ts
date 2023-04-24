import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ISentenceCategory from '../repositories/ISentenceCategory';

type DeleteSentenceCategoryRequest = {
  sentence_category_id: string;
};

@injectable()
class DeleteSentenceCategoryService {
  constructor(
    @inject('SentenceCategoryRepository')
    private sentenceCategory: ISentenceCategory,
  ) {}

  public async execute({
    sentence_category_id,
  }: DeleteSentenceCategoryRequest): Promise<void> {
    const sentenceCategory = await this.sentenceCategory.findById(
      sentence_category_id,
    );
    if (!sentenceCategory) {
      throw new AppError('Sentence category not found');
    }
    await this.sentenceCategory.delete(sentenceCategory);
  }
}

export default DeleteSentenceCategoryService;
