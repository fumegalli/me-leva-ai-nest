import DriversRepository from '@application/repositories/drivers-repository';
import DriverNotFound from '../errors/driver-not-found';

interface Input {
  driverId: string;
  amount: number;
}

export default class Withdraw {
  constructor(private readonly driversRepo: DriversRepository) {}

  async execute(input: Input): Promise<void> {
    const driver = await this.driversRepo.findById(input.driverId);
    if (!driver) throw new DriverNotFound();
    driver.withdraw(input.amount);
    await this.driversRepo.save(driver);
  }
}
