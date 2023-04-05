import CreateTbcDTO from '../dtos/CreateTbcDTO';
import Tbc from '../infra/typeorm/entities/Tbc';

export default interface ITbcsRepository {
  create: (data: CreateTbcDTO) => Promise<Tbc>;
}
