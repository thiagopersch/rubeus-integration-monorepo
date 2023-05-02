import CreateSentenceDTO from '../dtos/CreateSentenceDTO';
import Sentence from '../infra/typeorm/entities/Sentence';

export default interface ISentenceRepository {
  findById: (sentence_id: string) => Promise<Sentence | undefined>;
  findOne: (sentence_id: string) => Promise<Sentence | undefined>;
  findAll: () => Promise<Sentence[]>;
  create: (data: CreateSentenceDTO) => Promise<Sentence>;
  update: (sentence: Sentence) => Promise<Sentence>;
  delete: (sentence: Sentence) => Promise<void>;
}
