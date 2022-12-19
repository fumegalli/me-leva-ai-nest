import Passenger from '@application/entities/passenger/passenger';
import Email from '@application/entities/person/email';
import { PersonProps } from '@application/entities/person/person';

export default function makePassenger(override: Partial<PersonProps> = {}) {
  return new Passenger({
    birthDate: new Date(2000, 1, 1),
    email: new Email('test@test.com'),
    fullName: 'John Doe',
    ...override,
  });
}
