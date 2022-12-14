import Email from '../person/email';
import Passanger from './passanger';

const TODAY = new Date();
const TOMORROW = new Date();
TOMORROW.setDate(TODAY.getDate() + 1);

describe('Passanger', () => {
  it('should be able to create a passanger', () => {
    const passanger = new Passanger({
      birthDate: new Date(2000, 1, 1),
      email: new Email('test@test.com'),
      fullName: 'Rafael Fumegalli',
    });

    expect(passanger).toBeTruthy();
  });

  it('should throw error when passanger age is under 16', () => {
    expect(
      () =>
        new Passanger({
          birthDate: TODAY,
          email: new Email('test@test.com'),
          fullName: 'Rafael Fumegalli',
        }),
    ).toThrow(new Error('Passanger is under age'));
  });
});
