import makePassenger from '@test/factories/passenger-factory';
import InMemoryPassengersRepository from '@test/repositories/in-memory-passengers-repository';
import passengerNotFound from '../errors/passenger-not-found';
import InvalidDeposit from '../errors/invalid-deposit';
import Deposit from './deposit';

describe('Deposit', () => {
  it('should be able to deposit', async () => {
    const passengersRepo = new InMemoryPassengersRepository();
    const passenger = makePassenger();
    passengersRepo.create(passenger);
    const deposit = new Deposit(passengersRepo);
    await deposit.execute({
      passengerId: passenger.id,
      amount: 100,
    });

    expect(passenger.wallet.balance).toBe(100);
  });

  it('should throw passenger not found when try to deposit', async () => {
    const passengersRepo = new InMemoryPassengersRepository();
    const deposit = new Deposit(passengersRepo);

    await expect(() =>
      deposit.execute({
        passengerId: 'fake-id',
        amount: 100,
      }),
    ).rejects.toThrow(passengerNotFound);
  });

  it('should throw invalid deposit when amount is lower or equal to 0', async () => {
    const passenger = makePassenger();
    const passengersRepo = new InMemoryPassengersRepository();
    passengersRepo.create(passenger);
    const deposit = new Deposit(passengersRepo);

    await expect(() =>
      deposit.execute({
        passengerId: passenger.id,
        amount: 0,
      }),
    ).rejects.toThrow(InvalidDeposit);
  });
});
