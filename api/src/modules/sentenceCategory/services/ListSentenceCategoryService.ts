import { inject, injectable } from 'tsyringe';

import ISentenceCategory from '../repositories/ISentenceCategory';
import SentenceCategory from '../infra/typeorm/entities/SentenceCategory';

@injectable()
class ListSentenceCategoryService {
  constructor(
    @inject('SentenceCategoryRepository')
    private sentenceCategory: ISentenceCategory,
  ) {}

  public async execute(): Promise<SentenceCategory[]> {
    const sentenceCategory = await this.sentenceCategory.findAll();
    return sentenceCategory;
  }
}

export default ListSentenceCategoryService;
