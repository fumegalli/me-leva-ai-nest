import VehiclesRepository from '../../src/application/repositories/vehicles-repository';
import Vehicle from '../../src/application/entities/vehicle/vehicle';

export default class InMemoryVehiclesRepository implements VehiclesRepository {
  public vehicles: Vehicle[] = [];

  async create(vehicle: Vehicle): Promise<void> {
    this.vehicles.push(vehicle);
  }

  async findFistAvailableByOwner(ownerId: string): Promise<Vehicle | null> {
    const vehicle = this.vehicles.find(
      (vehicle) => vehicle.ownerId === ownerId,
    );
    if (!vehicle) return null;
    return vehicle;
  }
}
