import { inject, injectable } from 'tsyringe';
import SentenceCategory from '../infra/typeorm/entities/SentenceCategory';
import ISentenceCategory from '../repositories/ISentenceCategory';

type CreateSentenceCategoryRequest = {
  name: string;
  description: string;
  status: boolean;
};

@injectable()
class CreateSentenceCategoryService {
  constructor(
    @inject('SentenceCategoryRepository')
    private sentenceCategory: ISentenceCategory,
  ) {}

  public async execute({
    name,
    description,
    status,
  }: CreateSentenceCategoryRequest): Promise<SentenceCategory> {
    const sentenceCategory = await this.sentenceCategory.create({
      name,
      description,
      status,
    });
    return sentenceCategory;
  }
}
export default CreateSentenceCategoryService;
