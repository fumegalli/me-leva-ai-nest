import InsufficientBalance from '@application/entities/errors/insufficient-balance';
import makePassenger from '@test/factories/passenger-factory';
import InMemoryPassengersRepository from '@test/repositories/in-memory-passengers-repository';
import PassengerNotFound from '../errors/passenger-not-found';
import InvalidWithdraw from '../errors/invalid-withdraw';
import Withdraw from './withdraw';

describe('Withdraw', () => {
  it('should be able to withdraw', async () => {
    const passengersRepo = new InMemoryPassengersRepository();
    const passenger = makePassenger();
    passenger.deposit(100);
    passengersRepo.create(passenger);
    const withdraw = new Withdraw(passengersRepo);
    await withdraw.execute({
      passengerId: passenger.id,
      amount: 100,
    });

    expect(passenger.wallet.balance).toBe(0);
  });

  it('should throw passenger not found when try to withdraw', async () => {
    const passengersRepo = new InMemoryPassengersRepository();
    const withdraw = new Withdraw(passengersRepo);

    await expect(() =>
      withdraw.execute({
        passengerId: 'fake-id',
        amount: 100,
      }),
    ).rejects.toThrow(PassengerNotFound);
  });

  it('should throw insufficient balance when try to withdraw', async () => {
    const passenger = makePassenger();
    const passengersRepo = new InMemoryPassengersRepository();
    passengersRepo.create(passenger);
    const withdraw = new Withdraw(passengersRepo);

    await expect(() =>
      withdraw.execute({
        passengerId: passenger.id,
        amount: 100,
      }),
    ).rejects.toThrow(InsufficientBalance);
  });

  it('should throw invalid withdraw when amount is lower or equal to 0', async () => {
    const passenger = makePassenger();
    const passengersRepo = new InMemoryPassengersRepository();
    passengersRepo.create(passenger);
    const withdraw = new Withdraw(passengersRepo);

    await expect(() =>
      withdraw.execute({
        passengerId: passenger.id,
        amount: 0,
      }),
    ).rejects.toThrow(InvalidWithdraw);
  });
});
