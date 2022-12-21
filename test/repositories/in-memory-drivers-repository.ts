import Driver from '../../src/application/entities/driver/driver';
import DriversRepository from '../../src/application/repositories/drivers-repository';

export default class InMemoryDriversRepository implements DriversRepository {
  public drivers: Driver[] = [];

  async create(driver: Driver): Promise<void> {
    this.drivers.push(driver);
  }

  async deleteById(id: string): Promise<void> {
    this.drivers = this.drivers.filter((driver) => driver.id !== id);
  }

  async findById(id: string): Promise<Driver> {
    const driver = this.drivers.find((driver) => driver.id === id);
    if (!driver) return null;
    return driver;
  }

  async save(driver: Driver): Promise<void> {
    const driverIndex = this.drivers.findIndex((item) => item.id === driver.id);
    if (driverIndex >= 0) {
      this.drivers[driverIndex] = driver;
    }
  }
}
