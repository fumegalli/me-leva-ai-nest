import InMemoryDriversRepository from '@test/repositories/in-memory-drivers-repository';
import CreateDriver from './create-driver';

const TODAY = new Date();
const TOMORROW = new Date();
TOMORROW.setDate(TODAY.getDate() + 1);

describe('Create Driver', () => {
  it('should be able to create a new drvier', async () => {
    const dirversRepo = new InMemoryDriversRepository();
    const createDriver = new CreateDriver(dirversRepo);
    const { driver } = await createDriver.execute({
      birthDate: new Date(2000, 1, 1),
      email: 'test@test.com',
      fullName: 'Rafael Fumegalli',
      license: {
        category: 'B',
        code: 123,
        expiresAt: TOMORROW,
      },
    });

    expect(dirversRepo.drivers).toHaveLength(1);
    expect(dirversRepo.drivers[0]).toEqual(driver);
  });
});
