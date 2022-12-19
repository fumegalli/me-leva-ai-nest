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
    ride.estimateArrivalTime();
    const estimatedFare = FareCalculator.estimate(ride.estimatedArrivalTime);
    ride.estimateFare(estimatedFare);
    await this.ridesRepo.save(ride);
    return {
      estimatedArrivalTimeInMinutes: ride.estimatedArrivalTime,
      estimatedFare,
    };
  }
}
