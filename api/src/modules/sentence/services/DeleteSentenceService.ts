import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ISentenceRepository from '../repositories/ISentenceRepository';

type DeleteSentenceRequest = {
  sentence_id: string;
};

@injectable()
class DeleteSentenceService {
  constructor(
    @inject('SentenceRepository')
    private sentence: ISentenceRepository,
  ) {}

  public async execute({ sentence_id }: DeleteSentenceRequest): Promise<void> {
    const sentence = await this.sentence.findById(sentence_id);
    if (!sentence) {
      throw new AppError('Sentence not found');
    }
    await this.sentence.delete(sentence);
  }
}

export default DeleteSentenceService;
