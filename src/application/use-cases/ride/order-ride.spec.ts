import InMemoryVehiclesRepository from '@test/repositories/in-memory-vehicles-repository';
import InMemoryRidesRepository from '@test/repositories/in-memory-rides-repository';
import OrderRide from './order-ride';
import Vehicle from '@application/entities/vehicle/vehicle';
import NoAvailableVehicle from '../errors/no-available-vehicle';

describe('Order a ride', () => {
  it('should order a new ride', async () => {
    const ridesRepo = new InMemoryRidesRepository();
    const vehiclesRepo = new InMemoryVehiclesRepository();
    vehiclesRepo.create(
      new Vehicle({
        model: 'Tesla X',
        category: 'B',
        ownerId: '123',
      }),
    );
    const orderRide = new OrderRide(ridesRepo, vehiclesRepo);
    const { ride } = await orderRide.execute({
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

    expect(() => {
      return orderRide.execute({
        passengerId: '123',
        startingPoint: 1,
        endingPoint: 2,
      });
    }).rejects.toThrow(NoAvailableVehicle);
  });
});
