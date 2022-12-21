import Passenger from '../entities/passenger/passenger';

export default abstract class PassengersRepository {
  abstract create(passenger: Passenger): Promise<void>;
  abstract findById(id: string): Promise<Passenger | null>;
  abstract save(passenger: Passenger): Promise<void>;
}
