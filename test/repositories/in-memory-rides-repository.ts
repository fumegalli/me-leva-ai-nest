import RidesRepository from '../../src/application/repositories/rides-repository';
import Ride from '../../src/application/entities/ride/ride';

export default class InMemoryRidesRepository implements RidesRepository {
  public rides: Ride[] = [];

  async create(ride: Ride): Promise<void> {
    this.rides.push(ride);
  }
}
