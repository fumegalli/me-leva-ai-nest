import VehiclesRepository from '../../src/application/repositories/vehicles-repository';
import Vehicle from '../../src/application/entities/vehicle/vehicle';

export default class InMemoryVehiclesRepository implements VehiclesRepository {
  public vehicles: Vehicle[] = [];

  async create(vehicle: Vehicle): Promise<void> {
    this.vehicles.push(vehicle);
  }
}
