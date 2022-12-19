import Vehicle from '../entities/vehicle/vehicle';

export default abstract class VehiclesRepository {
  abstract create(vehicle: Vehicle): Promise<void>;
  abstract findFistAvailableByOwner(ownerId: string): Promise<Vehicle | null>;
}
