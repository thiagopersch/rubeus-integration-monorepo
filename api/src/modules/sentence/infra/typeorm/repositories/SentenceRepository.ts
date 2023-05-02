import { Repository } from 'typeorm';

import { dataSource } from '@config/data_source';

import CreateSentenceDTO from '@modules/sentence/dtos/CreateSentenceDTO';
import ISentenceRepository from '@modules/sentence/repositories/ISentenceRepository';
import Sentence from '../entities/Sentence';

class SentenceRepository implements ISentenceRepository {
  private ormRepository: Repository<Sentence>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Sentence);
  }

  public async findById(sentence_id: string): Promise<Sentence | undefined> {
    const sentence = await this.ormRepository.findOne({
      where: { id: sentence_id },
    });
    return sentence ?? undefined;
  }

  public async findOne(sentence_id: string): Promise<Sentence | undefined> {
    const sentence = await this.ormRepository.findOne({
      where: { id: sentence_id },
    });

    return sentence ?? undefined;
  }

  public async findAll(): Promise<Sentence[]> {
    const sentence = await this.ormRepository.find({
      order: { code: 'ASC' },
    });
    return sentence;
  }

  public async create({
    sentence_category_id,
    code,
    coligate,
    name,
    content,
    system_code,
  }: CreateSentenceDTO): Promise<Sentence> {
    const sentence = await this.ormRepository.create({
      sentence_category_id,
      code,
      coligate,
      name,
      content,
      system_code,
    });

    await this.ormRepository.save(sentence);
    return sentence;
  }

  public async update(sentence_id: Sentence): Promise<Sentence> {
    await this.ormRepository.save(sentence_id);
    return sentence_id;
  }

  public async delete(sentence_id: Sentence): Promise<void> {
    await this.ormRepository.softRemove(sentence_id);
  }
}

export default SentenceRepository;
