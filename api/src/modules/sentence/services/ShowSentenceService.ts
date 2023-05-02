import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Sentence from '../infra/typeorm/entities/Sentence';
import ISentenceRepository from '../repositories/ISentenceRepository';

type ShowSentenceRequest = {
  sentence_id: string;
};

@injectable()
class ShowSentenceService {
  constructor(
    @inject('SentenceRepository')
    private sentence: ISentenceRepository,
  ) {}

  public async execute({
    sentence_id,
  }: ShowSentenceRequest): Promise<Sentence> {
    const sentence = await this.sentence.findOne(sentence_id);
    if (!sentence) {
      throw new AppError('Sentence not found');
    }

    return sentence;
  }
}

export default ShowSentenceService;
