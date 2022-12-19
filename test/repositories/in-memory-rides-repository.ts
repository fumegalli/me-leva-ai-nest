import RidesRepository from '@application/repositories/rides-repository';
import Ride from '@application/entities/ride/ride';

export default class InMemoryRidesRepository implements RidesRepository {
  public rides: Ride[] = [];

  async create(ride: Ride): Promise<void> {
    this.rides.push(ride);
  }

  async findById(id: string): Promise<Ride> {
    const ride = this.rides.find((ride) => ride.id === id);
    if (!ride) return null;
    return ride;
  }

  async save(ride: Ride): Promise<void> {
    const rideIndex = this.rides.findIndex((item) => item.id === ride.id);
    if (rideIndex >= 0) {
      this.rides[rideIndex] = ride;
    }
  }
}
