import CreateTbcDTO from '../dtos/CreateTbcDTO';
import Tbc from '../infra/typeorm/entities/Tbc';

export default interface ITbcRepository {
  findById: (tbc_id: string) => Promise<Tbc | undefined>;
  findOne: (tbc_id: string) => Promise<Tbc | undefined>;
  findAll: () => Promise<Tbc[]>;
  create: (data: CreateTbcDTO) => Promise<Tbc>;
  update: (client: Tbc) => Promise<Tbc>;
  delete: (client: Tbc) => Promise<void>;
}
