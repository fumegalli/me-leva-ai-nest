import InsufficientBalance from '@application/entities/errors/insufficient-balance';
import makeDriver from '@test/factories/driver-factory';
import InMemoryDriversRepository from '@test/repositories/in-memory-drivers-repository';
import driverNotFound from '../errors/driver-not-found';
import Withdraw from './withdraw';

describe('Withdraw', () => {
  it('should be able to withdraw', async () => {
    const driversRepo = new InMemoryDriversRepository();
    const driver = makeDriver();
    driver.deposit(100);
    driversRepo.create(driver);
    const withdraw = new Withdraw(driversRepo);
    await withdraw.execute({
      driverId: driver.id,
      amount: 100,
    });

    expect(driver.wallet.balance).toBe(0);
  });

  it('should throw driver not found when try to withdraw', async () => {
    const driversRepo = new InMemoryDriversRepository();
    const withdraw = new Withdraw(driversRepo);

    await expect(() =>
      withdraw.execute({
        driverId: 'fake-id',
        amount: 100,
      }),
    ).rejects.toThrow(driverNotFound);
  });

  it('should throw insufficient balance when try to withdraw', async () => {
    const driver = makeDriver();
    const driversRepo = new InMemoryDriversRepository();
    driversRepo.create(driver);
    const withdraw = new Withdraw(driversRepo);

    await expect(() =>
      withdraw.execute({
        driverId: driver.id,
        amount: 100,
      }),
    ).rejects.toThrow(InsufficientBalance);
  });
});
