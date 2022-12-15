import InMemoryPassengersRepository from '../../../../test/repositories/in-memory-passengers-repository';
import CreatePassenger from './create-passenger';

const TODAY = new Date();
const TOMORROW = new Date();
TOMORROW.setDate(TODAY.getDate() + 1);

describe('Create passenger', () => {
  it('should be able to create a new passenger', async () => {
    const passengersRepo = new InMemoryPassengersRepository();
    const createPassenger = new CreatePassenger(passengersRepo);
    const { passenger } = await createPassenger.execute({
      birthDate: new Date(2000, 1, 1),
      email: 'test@test.com',
      fullName: 'Rafael Fumegalli',
    });

    expect(passengersRepo.passengers).toHaveLength(1);
    expect(passengersRepo.passengers[0]).toEqual(passenger);
  });
});
