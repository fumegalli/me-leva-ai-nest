import FareCalculator from '@application/entities/ride/fare-calculator';
import DriversRepository from '@application/repositories/drivers-repository';
import PassengersRepository from '@application/repositories/passengers-repository';
import RidesRepository from '@application/repositories/rides-repository';
import DriverNotFound from '../errors/driver-not-found';
import PassengerNotFound from '../errors/passenger-not-found';
import RideNotStarted from '../errors/ride-not-started';

interface Input {
  rideId: string;
}

interface Output {
  startedAt: Date;
  endedAt: Date;
  fare: number;
}

export default class FinishRide {
  constructor(
    private readonly ridesRepo: RidesRepository,
    private readonly passengersRepo: PassengersRepository,
    private readonly driversRepo: DriversRepository,
  ) {}

  async execute(input: Input): Promise<Output> {
    const ride = await this.ridesRepo.findById(input.rideId);
    if (!ride?.startedAt) throw new RideNotStarted();
    ride.finish();
    const fare = FareCalculator.calculate(ride.startedAt, ride.endedAt);
    ride.fare(fare);
    const passenger = await this.passengersRepo.findById(ride.passengerId);
    if (!passenger) throw new PassengerNotFound();
    const driver = await this.driversRepo.findById(ride.driverId);
    if (!driver) throw new DriverNotFound();
    passenger.withdraw(fare);
    driver.deposit(fare);
    await Promise.all([
      this.passengersRepo.save(passenger),
      this.driversRepo.save(driver),
      this.ridesRepo.save(ride),
    ]);
    return {
      startedAt: ride.startedAt,
      endedAt: ride.endedAt,
      fare: ride.getFare,
    };
  }
}
