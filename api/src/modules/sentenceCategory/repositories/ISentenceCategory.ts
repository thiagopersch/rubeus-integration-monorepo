import CreateSentenceCategoryDTO from '../dtos/CreateSentenceCategoryDTO';
import SentenceCategory from '../infra/typeorm/entities/SentenceCategory';

export default interface ISentenceCategory {
  findById: (
    sentence_category_id: string,
  ) => Promise<SentenceCategory | undefined>;
  findOne: (
    sentence_category_id: string,
  ) => Promise<SentenceCategory | undefined>;
  findAll: () => Promise<SentenceCategory[]>;
  create: (data: CreateSentenceCategoryDTO) => Promise<SentenceCategory>;
  update: (sentenceCategory: SentenceCategory) => Promise<SentenceCategory>;
  delete: (sentenceCategory: SentenceCategory) => Promise<void>;
}
