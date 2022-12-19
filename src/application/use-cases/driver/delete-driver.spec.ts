import makeDriver from '@test/factories/driver-factory';
import InMemoryDriversRepository from '@test/repositories/in-memory-drivers-repository';
import DeleteDriver from './delete-driver';

const TODAY = new Date();
const TOMORROW = new Date();
TOMORROW.setDate(TODAY.getDate() + 1);
const DRIVER_TO_DELETE = makeDriver();

describe('Delete Driver', () => {
  it('should be able to delete an existing driver', async () => {
    const driversRepo = new InMemoryDriversRepository();
    driversRepo.create(DRIVER_TO_DELETE);
    const deleteDriver = new DeleteDriver(driversRepo);
    await deleteDriver.execute(DRIVER_TO_DELETE.id);

    expect(driversRepo.drivers).toHaveLength(0);
  });

  it('should throw error when driver doesnt exists', async () => {
    const driversRepo = new InMemoryDriversRepository();
    const deleteDriver = new DeleteDriver(driversRepo);
    await expect(
      async () => await deleteDriver.execute(DRIVER_TO_DELETE.id),
    ).rejects.toThrow(new Error('Driver not found'));
  });
});
