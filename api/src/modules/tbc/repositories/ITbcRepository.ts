import CreateTbcDTO from '../dtos/CreateTbcDTO';
import Tbc from '../infra/typeorm/entities/Tbc';

export default interface ITbcRepository {
  findById: (tbc_id: string) => Promise<Tbc | undefined>;
  findOne: (tbc_id: string) => Promise<Tbc | undefined>;
  findAll: () => Promise<Tbc[]>;
  create: (data: CreateTbcDTO) => Promise<Tbc>;
  update: (tbc: Tbc) => Promise<Tbc>;
  delete: (tbc: Tbc) => Promise<void>;
}
