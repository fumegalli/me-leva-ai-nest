import PassengersRepository from '../../src/application/repositories/passengers-repository';
import Passenger from '../../src/application/entities/passenger/passenger';

export default class InMemoryPassengersRepository
  implements PassengersRepository
{
  public passengers: Passenger[] = [];

  async create(passenger: Passenger): Promise<void> {
    this.passengers.push(passenger);
  }

  async findById(id: string): Promise<Passenger> {
    const passenger = this.passengers.find((passenger) => passenger.id === id);
    if (!passenger) return null;
    return passenger;
  }

  async save(passenger: Passenger): Promise<void> {
    const passengerIndex = this.passengers.findIndex(
      (item) => item.id === passenger.id,
    );
    if (passengerIndex >= 0) {
      this.passengers[passengerIndex] = passenger;
    }
  }
}
