import Driver from '../../src/application/entities/driver/driver';
import DriversRepository from '../../src/application/repositories/drivers-repository';

export default class InMemoryDriversRepository implements DriversRepository {
  public drivers: Driver[] = [];

  async create(driver: Driver): Promise<void> {
    this.drivers.push(driver);
  }
}
