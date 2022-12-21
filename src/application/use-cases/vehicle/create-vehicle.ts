import Vehicle from '../../entities/vehicle/vehicle';
import DriversRepository from '../../repositories/drivers-repository';
import VehiclesRepository from '../../repositories/vehicles-repository';
import DriverNotAllowedToDriveVehicle from '../errors/driver-not-allowed-to-drive-vehicle';
import OwnerNotFound from '../errors/owner-not-found';

interface Input {
  model: string;
  category: string;
  ownerId: string;
}

export default class CreateVehicle {
  constructor(
    private readonly vehiclesRepo: VehiclesRepository,
    private readonly driversRepo: DriversRepository,
  ) {}

  async execute(input: Input) {
    const owner = await this.driversRepo.findById(input.ownerId);
    if (!owner) {
      throw new OwnerNotFound();
    }
    if (owner.license.category !== input.category) {
      throw new DriverNotAllowedToDriveVehicle();
    }
    const vehicle = new Vehicle({
      category: input.category,
      model: input.model,
      ownerId: input.ownerId,
    });

    await this.vehiclesRepo.create(vehicle);

    return { vehicle };
  }
}
