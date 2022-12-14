import InMemoryDriversRepository from '../../../test/repositories/in-memory-drivers-repository';
import Driver from '../entities/driver/driver';
import License from '../entities/driver/license';
import Email from '../entities/person/email';
import DeleteDriver from './delete-driver';

const TODAY = new Date();
const TOMORROW = new Date();
TOMORROW.setDate(TODAY.getDate() + 1);
const DRIVER_TO_DELETE = new Driver({
  birthDate: new Date(2000, 1, 1),
  email: new Email('test@test.com'),
  fullName: 'Rafael Fumegalli',
  license: new License({
    category: 'B',
    code: 123,
    expiresAt: TOMORROW,
  }),
});

describe('Delete Driver', () => {
  it('should be able to delete an existing driver', async () => {
    const dirversRepo = new InMemoryDriversRepository();
    dirversRepo.create(DRIVER_TO_DELETE);
    const deleteDriver = new DeleteDriver(dirversRepo);
    await deleteDriver.execute(DRIVER_TO_DELETE.id);

    expect(dirversRepo.drivers).toHaveLength(0);
  });

  it('should throw error when driver doesnt exists', async () => {
    const dirversRepo = new InMemoryDriversRepository();
    const deleteDriver = new DeleteDriver(dirversRepo);
    await expect(
      async () => await deleteDriver.execute(DRIVER_TO_DELETE.id),
    ).rejects.toThrow(new Error('Driver not found'));
  });
});
