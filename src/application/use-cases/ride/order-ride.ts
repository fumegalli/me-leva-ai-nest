import Ride from '../../../../src/application/entities/ride/ride';
import RidesRepository from '../../../../src/application/repositories/rides-repository';
import VehiclesRepository from '../../../../src/application/repositories/vehicles-repository';
import NoAvailableVehicle from '../errors/no-available-vehicle';

interface Input {
  passengerId: string;
  startingPoint: number;
  endingPoint: number;
}

export default class OrderRide {
  constructor(
    private readonly ridesRepo: RidesRepository,
    private readonly vehiclesRepo: VehiclesRepository,
  ) {}

  async execute(input: Input) {
    const vehicle = await this.vehiclesRepo.findFistAvailable();
    if (!vehicle) throw new NoAvailableVehicle();
    const ride = new Ride({
      passengerId: input.passengerId,
      endingPoint: input.endingPoint,
      startingPoint: input.startingPoint,
      vehicleId: vehicle.id,
    });
    await this.ridesRepo.create(ride);
    return { ride };
  }
}
