import PassengersRepository from '../../src/application/repositories/passengers-repository';
import Passenger from '../../src/application/entities/passenger/passenger';

export default class InMemoryPassengersRepository
  implements PassengersRepository
{
  public passengers: Passenger[] = [];

  async create(passenger: Passenger): Promise<void> {
    this.passengers.push(passenger);
  }
}
