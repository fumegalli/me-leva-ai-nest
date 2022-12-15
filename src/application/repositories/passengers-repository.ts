import Passenger from '../entities/passenger/passenger';

export default abstract class PassengersRepository {
  abstract create(passenger: Passenger): Promise<void>;
}
