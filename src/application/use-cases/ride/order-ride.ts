import Ride from '@application/entities/ride/ride';
import RidesRepository from '@application/repositories/rides-repository';
import VehiclesRepository from '@application/repositories/vehicles-repository';
import NoAvailableVehicle from '../errors/no-available-vehicle';

interface Input {
  passengerId: string;
  driverId: string;
  startingPoint: number;
  endingPoint: number;
}

export default class OrderRide {
  constructor(
    private readonly ridesRepo: RidesRepository,
    private readonly vehiclesRepo: VehiclesRepository,
  ) {}

  async execute(input: Input) {
    const vehicle = await this.vehiclesRepo.findFistAvailableByOwner(
      input.driverId,
    );
    if (!vehicle) throw new NoAvailableVehicle();
    const ride = new Ride({
      passengerId: input.passengerId,
      endingPoint: input.endingPoint,
      startingPoint: input.startingPoint,
      vehicleId: vehicle.id,
      driverId: input.driverId,
    });
    await this.ridesRepo.create(ride);
    return { ride };
  }
}
