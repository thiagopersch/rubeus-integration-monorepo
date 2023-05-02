import { inject, injectable } from 'tsyringe';

import ISentenceRepository from '../repositories/ISentenceRepository';
import Sentence from '../infra/typeorm/entities/Sentence';

type CreateSentenceRequest = {
  sentence_category_id: string;
  code: string;
  name: string;
  coligate: string;
  system_code: string;
  content: string;
};

@injectable()
class CreateSentenceService {
  constructor(
    @inject('SentenceRepository')
    private sentence: ISentenceRepository,
  ) {}

  public async execute({
    sentence_category_id,
    code,
    name,
    coligate,
    system_code,
    content,
  }: CreateSentenceRequest): Promise<Sentence> {
    const sentence = await this.sentence.create({
      sentence_category_id,
      code,
      name,
      coligate,
      system_code,
      content,
    });
    return sentence;
  }
}
export default CreateSentenceService;
