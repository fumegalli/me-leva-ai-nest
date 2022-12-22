import DriverUnderAge from '../errors/driver-under-age';
import Email from '../person/email';
import Driver from './driver';
import License from './license';

const TODAY = new Date();
const TOMORROW = new Date();
TOMORROW.setDate(TODAY.getDate() + 1);

describe('Driver', () => {
  it('should be able to create a driver', () => {
    const driver = new Driver({
      birthDate: new Date(2000, 1, 1),
      email: new Email('test@test.com'),
      fullName: 'Rafael Fumegalli',
      license: new License({
        category: 'B',
        expiresAt: TOMORROW,
      }),
    });

    expect(driver).toBeTruthy();
  });

  it('should throw error when diver age is under 18', () => {
    expect(
      () =>
        new Driver({
          birthDate: TODAY,
          email: new Email('test@test.com'),
          fullName: 'Rafael Fumegalli',
          license: new License({
            category: 'B',
            expiresAt: TOMORROW,
          }),
        }),
    ).toThrow(DriverUnderAge);
  });
});
