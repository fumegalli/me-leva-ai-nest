import ArrivalTimeCalculator from '@application/entities/ride/arrival-time-calculator';
import FareCalculator from '@application/entities/ride/fare-calculator';
import RidesRepository from '@application/repositories/rides-repository';
import RideNotFound from '../errors/ride-not-found';

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
