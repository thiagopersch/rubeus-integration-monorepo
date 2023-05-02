import { inject, injectable } from 'tsyringe';

import Sentence from '../infra/typeorm/entities/Sentence';
import ISentenceRepository from '../repositories/ISentenceRepository';

@injectable()
class ListSentenceService {
  constructor(
    @inject('SentenceRepository') private sentence: ISentenceRepository,
  ) {}

  public async execute(): Promise<Sentence[]> {
    const sentence = await this.sentence.findAll();
    return sentence;
  }
}

export default ListSentenceService;
