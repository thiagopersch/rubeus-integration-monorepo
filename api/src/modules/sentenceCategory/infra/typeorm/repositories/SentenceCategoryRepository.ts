import { Repository } from 'typeorm';

import { dataSource } from '@config/data_source';

import CreateSentenceCategoryDTO from '@modules/sentenceCategory/dtos/CreateSentenceCategoryDTO';

import ISentenceCategory from '@modules/sentenceCategory/repositories/ISentenceCategory';
import SentenceCategory from '../entities/SentenceCategory';

class SentenceCategoryRepository implements ISentenceCategory {
  private ormRepository: Repository<SentenceCategory>;

  constructor() {
    this.ormRepository = dataSource.getRepository(SentenceCategory);
  }

  public async findById(
    sentence_category_id: string,
  ): Promise<SentenceCategory | undefined> {
    const sentenceCategory = await this.ormRepository.findOne({
      where: { id: sentence_category_id },
    });
    return sentenceCategory ?? undefined;
  }

  public async findOne(
    sentence_category_id: string,
  ): Promise<SentenceCategory | undefined> {
    const sentenceCategory = await this.ormRepository.findOne({
      where: { id: sentence_category_id },
    });

    return sentenceCategory ?? undefined;
  }

  public async findAll(): Promise<SentenceCategory[]> {
    const sentenceCategory = await this.ormRepository.find({
      order: { name: 'ASC' },
    });
    return sentenceCategory;
  }

  public async create({
    name,
    description,
    status,
  }: CreateSentenceCategoryDTO): Promise<SentenceCategory> {
    const sentenceCategory = await this.ormRepository.create({
      name,
      description,
      status,
    });

    await this.ormRepository.save(sentenceCategory);
    return sentenceCategory;
  }

  public async update(
    sentence_category: SentenceCategory,
  ): Promise<SentenceCategory> {
    await this.ormRepository.save(sentence_category);
    return sentence_category;
  }

  public async delete(sentence_category: SentenceCategory): Promise<void> {
    await this.ormRepository.softRemove(sentence_category);
  }
}

export default SentenceCategoryRepository;
