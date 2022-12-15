import Vehicle from '../../entities/vehicle/vehicle';
import DriversRepository from '../../repositories/drivers-repository';
import VehiclesRepository from '../../repositories/vehicles-repository';

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
      throw new Error('Owner not found');
    }
    if (owner.license.category !== input.category) {
      throw new Error('Driver not allowed to drive this vehicle');
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
