import Email from '../person/email';
import Passenger from './passenger';

const TODAY = new Date();
const TOMORROW = new Date();
TOMORROW.setDate(TODAY.getDate() + 1);

describe('Passenger', () => {
  it('should be able to create a passenger', () => {
    const passenger = new Passenger({
      birthDate: new Date(2000, 1, 1),
      email: new Email('test@test.com'),
      fullName: 'Rafael Fumegalli',
    });

    expect(passenger).toBeTruthy();
  });

  it('should throw error when passenger age is under 16', () => {
    expect(
      () =>
        new Passenger({
          birthDate: TODAY,
          email: new Email('test@test.com'),
          fullName: 'Rafael Fumegalli',
        }),
    ).toThrow(new Error('Passenger is under age'));
  });
});
