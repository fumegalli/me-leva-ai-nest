import ExpiredLicense from '@application/entities/errors/expired-license';
import License from './license';

const TODAY = new Date();
const TOMORROW = new Date();
TOMORROW.setDate(TODAY.getDate() + 1);
const YESTERDAY = new Date();
YESTERDAY.setDate(TODAY.getDate() - 1);

describe('License', () => {
  it('should be able to create a license', () => {
    const license = new License({
      category: 'B',
      expiresAt: TOMORROW,
    });

    expect(license).toBeTruthy();
  });

  it('should throw error when license is expired', () => {
    expect(
      () =>
        new License({
          category: 'B',
          expiresAt: YESTERDAY,
        }),
    ).toThrow(ExpiredLicense);
  });
});
