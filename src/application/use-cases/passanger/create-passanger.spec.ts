import InMemoryPassangersRepository from '../../../../test/repositories/in-memory-passangers-repository';
import CreatePassanger from './create-passanger';

const TODAY = new Date();
const TOMORROW = new Date();
TOMORROW.setDate(TODAY.getDate() + 1);

describe('Create passanger', () => {
  it('should be able to create a new passanger', async () => {
    const passangersRepo = new InMemoryPassangersRepository();
    const createPassanger = new CreatePassanger(passangersRepo);
    const { passanger } = await createPassanger.execute({
      birthDate: new Date(2000, 1, 1),
      email: 'test@test.com',
      fullName: 'Rafael Fumegalli',
    });

    expect(passangersRepo.passangers).toHaveLength(1);
    expect(passangersRepo.passangers[0]).toEqual(passanger);
  });
});
