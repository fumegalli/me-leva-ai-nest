import Passanger from '../entities/passanger/passanger';

export default abstract class PassangersRepository {
  abstract create(passanger: Passanger): Promise<void>;
}
