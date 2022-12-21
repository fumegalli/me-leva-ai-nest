import DriversRepository from '@application/repositories/drivers-repository';
import InvalidWithdraw from '../errors/invalid-withdraw';
import DriverNotFound from '../errors/driver-not-found';

interface Input {
  driverId: string;
  amount: number;
}

export default class Withdraw {
  constructor(private readonly driversRepo: DriversRepository) {}

  async execute(input: Input): Promise<void> {
    const isAmountGreaterThanZero = input.amount > 0;
    if (!isAmountGreaterThanZero) throw new InvalidWithdraw();
    const driver = await this.driversRepo.findById(input.driverId);
    if (!driver) throw new DriverNotFound();
    driver.withdraw(input.amount);
    await this.driversRepo.save(driver);
  }
}
