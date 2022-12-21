import makeDriver from '@test/factories/driver-factory';
import InMemoryDriversRepository from '@test/repositories/in-memory-drivers-repository';
import InMemoryVehiclesRepository from '@test/repositories/in-memory-vehicles-repository';
import DriverNotAllowedToDriveVehicle from '../errors/driver-not-allowed-to-drive-vehicle';
import OwnerNotFound from '../errors/owner-not-found';
import CreateVehicle from './create-vehicle';

const TODAY = new Date();
const TOMORROW = new Date();
TOMORROW.setDate(TODAY.getDate() + 1);
const OWNER = makeDriver();

describe('Create Vehicle', () => {
  it('should be able to create a new vehicle', async () => {
    const vehiclesRepo = new InMemoryVehiclesRepository();
    const driversRepo = new InMemoryDriversRepository();
    driversRepo.create(OWNER);
    const createVehicle = new CreateVehicle(vehiclesRepo, driversRepo);
    const { vehicle } = await createVehicle.execute({
      model: 'Tesla X',
      category: 'B',
      ownerId: OWNER.id,
    });

    expect(vehiclesRepo.vehicles).toHaveLength(1);
    expect(vehiclesRepo.vehicles[0]).toEqual(vehicle);
  });

  it('should throw error when owner is not allowed to drive the vehicle', async () => {
    const driversRepo = new InMemoryDriversRepository();
    driversRepo.create(OWNER);
    const vehiclesRepo = new InMemoryVehiclesRepository();
    const createVehicle = new CreateVehicle(vehiclesRepo, driversRepo);
    await expect(() =>
      createVehicle.execute({
        model: 'Tesla X',
        category: 'A',
        ownerId: OWNER.id,
      }),
    ).rejects.toThrow(DriverNotAllowedToDriveVehicle);
  });

  it('should throw error when owner is not found', async () => {
    const driversRepo = new InMemoryDriversRepository();
    const vehiclesRepo = new InMemoryVehiclesRepository();
    const createVehicle = new CreateVehicle(vehiclesRepo, driversRepo);
    await expect(() =>
      createVehicle.execute({
        model: 'Tesla X',
        category: 'A',
        ownerId: '123',
      }),
    ).rejects.toThrow(OwnerNotFound);
  });
});
