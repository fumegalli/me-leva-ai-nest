import InsufficientBalance from '@application/entities/errors/insufficient-balance';
import makeDriver from '@test/factories/driver-factory';
import makePassenger from '@test/factories/passenger-factory';
import { makeRide, makeStartedRide } from '@test/factories/ride-factory';
import InMemoryDriversRepository from '@test/repositories/in-memory-drivers-repository';
import InMemoryPassengersRepository from '@test/repositories/in-memory-passengers-repository';
import InMemoryRidesRepository from '@test/repositories/in-memory-rides-repository';
import RideNotStarted from '../errors/ride-not-started';
import PassengerNotFound from '../errors/passenger-not-found';
import DriverNotFound from '../errors/driver-not-found';
import FinishRide from './finish-ride';

describe('Finish a ride', () => {
  it('should be able to finish a ride', async () => {
    const STARTING_BALANCE = 200;
    const passengersRepo = new InMemoryPassengersRepository();
    const passenger = makePassenger();
    passenger.deposit(STARTING_BALANCE);
    passengersRepo.create(passenger);
    const driversRepo = new InMemoryDriversRepository();
    const driver = makeDriver();
    driversRepo.create(driver);
    const ridesRepo = new InMemoryRidesRepository();
    const ride = makeStartedRide({
      driverId: driver.id,
      passengerId: passenger.id,
    });
    ridesRepo.create(ride);
    const finishRide = new FinishRide(ridesRepo, passengersRepo, driversRepo);
    const { endedAt, fare } = await finishRide.execute({
      rideId: ride.id,
    });

    expect(endedAt).toEqual(expect.any(Date));
    expect(fare).toEqual(expect.any(Number));
    expect(driver.wallet.balance).toEqual(fare);
    expect(passenger.wallet.balance).toEqual(STARTING_BALANCE - fare);
  });

  it('should throw Ride not started when try to finish a non-started ride', async () => {
    const passengersRepo = new InMemoryPassengersRepository();
    const driversRepo = new InMemoryDriversRepository();
    const ridesRepo = new InMemoryRidesRepository();
    const ride = makeRide();
    ridesRepo.create(ride);
    const finishRide = new FinishRide(ridesRepo, passengersRepo, driversRepo);

    await expect(() =>
      finishRide.execute({
        rideId: ride.id,
      }),
    ).rejects.toThrow(RideNotStarted);
  });

  it('should throw Insufficient Balance and ride should not be finished', async () => {
    const passengersRepo = new InMemoryPassengersRepository();
    const passenger = makePassenger();
    passengersRepo.create(passenger);
    const driversRepo = new InMemoryDriversRepository();
    const driver = makeDriver();
    driversRepo.create(driver);
    const ridesRepo = new InMemoryRidesRepository();
    const ride = makeStartedRide({
      passengerId: passenger.id,
      driverId: driver.id,
    });
    ridesRepo.create(ride);
    const finishRide = new FinishRide(ridesRepo, passengersRepo, driversRepo);

    await expect(() =>
      finishRide.execute({
        rideId: ride.id,
      }),
    ).rejects.toThrow(InsufficientBalance);
  });

  it('should throw Passenger not found when passenger is not found', async () => {
    const passengersRepo = new InMemoryPassengersRepository();
    const driversRepo = new InMemoryDriversRepository();
    const ridesRepo = new InMemoryRidesRepository();
    const ride = makeStartedRide();
    ridesRepo.create(ride);
    const finishRide = new FinishRide(ridesRepo, passengersRepo, driversRepo);

    await expect(() =>
      finishRide.execute({
        rideId: ride.id,
      }),
    ).rejects.toThrow(PassengerNotFound);
  });

  it('should throw Passenger not found when passenger is not found', async () => {
    const passengersRepo = new InMemoryPassengersRepository();
    const passenger = makePassenger();
    passengersRepo.create(passenger);
    const driversRepo = new InMemoryDriversRepository();
    const ridesRepo = new InMemoryRidesRepository();
    const ride = makeStartedRide({
      passengerId: passenger.id,
    });
    ridesRepo.create(ride);
    const finishRide = new FinishRide(ridesRepo, passengersRepo, driversRepo);

    await expect(() =>
      finishRide.execute({
        rideId: ride.id,
      }),
    ).rejects.toThrow(DriverNotFound);
  });
});
