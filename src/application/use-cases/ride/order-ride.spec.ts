import InMemoryVehiclesRepository from '@test/repositories/in-memory-vehicles-repository';
import InMemoryRidesRepository from '@test/repositories/in-memory-rides-repository';
import OrderRide from './order-ride';
import NoAvailableVehicle from '../errors/no-available-vehicle';
import makeVehicle from '@test/factories/vehicle-factory';

describe('Order a ride', () => {
  it('should order a new ride', async () => {
    const ridesRepo = new InMemoryRidesRepository();
    const vehiclesRepo = new InMemoryVehiclesRepository();
    const vehicle = makeVehicle();
    vehiclesRepo.create(vehicle);
    const orderRide = new OrderRide(ridesRepo, vehiclesRepo);
    const { ride } = await orderRide.execute({
      driverId: vehicle.ownerId,
      passengerId: '123',
      startingPoint: 1,
      endingPoint: 2,
    });

    expect(ridesRepo.rides).toHaveLength(1);
    expect(ride.id).toBeTruthy();
    expect(ride.vehicleId).toBeTruthy();
  });

  it('should throw NoAvailableVehicle when no available vehicle was found', async () => {
    const ridesRepo = new InMemoryRidesRepository();
    const vehiclesRepo = new InMemoryVehiclesRepository();
    const orderRide = new OrderRide(ridesRepo, vehiclesRepo);

    await expect(() =>
      orderRide.execute({
        driverId: '1234',
        passengerId: '123',
        startingPoint: 1,
        endingPoint: 2,
      }),
    ).rejects.toThrow(NoAvailableVehicle);
  });
});
