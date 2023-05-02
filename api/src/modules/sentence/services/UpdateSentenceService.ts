import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ISentenceRepository from '../repositories/ISentenceRepository';
import Sentence from '../infra/typeorm/entities/Sentence';

type UpdateSentenceRequest = {
  id: string;
  sentence_category_id: string;
  code: string;
  name: string;
  coligate: string;
  system_code: string;
  content: string;
};

@injectable()
class UpdateSentenceService {
  constructor(
    @inject('SentenceRepository')
    private sentence: ISentenceRepository,
  ) {}

  public async execute({
    id,
    sentence_category_id,
    code,
    name,
    coligate,
    system_code,
    content,
  }: UpdateSentenceRequest): Promise<Sentence> {
    const sentence = await this.sentence.findOne(id);
    if (!sentence) {
      throw new AppError('Sentence not found');
    }

    const newSentence = Object.assign(sentence, {
      sentence_category_id,
      code,
      name,
      coligate,
      system_code,
      content,
    });

    return this.sentence.update(newSentence);
  }
}

export default UpdateSentenceService;
