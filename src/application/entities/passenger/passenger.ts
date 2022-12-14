import { Replace } from '../../helpers/Replace';
import PassengerUnderAge from '../errors/passenger-under-age';
import Person, { PersonProps } from '../person/person';

export default class Passenger extends Person {
  private isUnderAge(birthDate: Date): boolean {
    const age = new Date().getFullYear() - birthDate.getFullYear();
    return age < 16; // TODO: Resolve magic number
  }

  constructor(props: Replace<PersonProps, { createdAt?: Date }>) {
    super(props);
    if (this.isUnderAge(props.birthDate)) {
      throw new PassengerUnderAge();
    }
  }
}
