import Driver from '@application/entities/driver/driver';
import License from '@application/entities/driver/license';
import Email from '@application/entities/person/email';
import { PersonProps } from '@application/entities/person/person';

const TODAY = new Date();
const TOMORROW = new Date();
TOMORROW.setDate(TODAY.getDate() + 1);

export default function makeDriver(override: Partial<PersonProps> = {}) {
  return new Driver({
    license: new License({
      category: 'B',
      expiresAt: TOMORROW,
    }),
    birthDate: new Date(2000, 1, 1),
    email: new Email('test@test.com'),
    fullName: 'John Doe',
    ...override,
  });
}
