import RidesRepository from '@application/repositories/rides-repository';
import RideNotFound from '../errors/ride-not-found';
import ArrivalTimeCalculator from './arrival-time-calculator';
import FareCalculator from './fare-calculator';

interface Input {
  rideId: string;
}

interface Output {
  estimatedArrivalTimeInMinutes: number;
  estimatedFare: number;
}

export default class StartRide {
  constructor(private readonly ridesRepo: RidesRepository) {}

  async execute(input: Input): Promise<Output> {
    const ride = await this.ridesRepo.findById(input.rideId);
    if (!ride) throw new RideNotFound();
    ride.start();
    const estimatedArrivalTimeInMinutes = ArrivalTimeCalculator.estimate();
    ride.estimateArrivalTime(estimatedArrivalTimeInMinutes);
    const estimatedFare = FareCalculator.estimate(
      estimatedArrivalTimeInMinutes,
    );
    ride.estimateFare(estimatedFare);
    await this.ridesRepo.save(ride);
    return { estimatedArrivalTimeInMinutes, estimatedFare };
  }
}
