import { Replace } from '../../helpers/Replace';
import DriverUnderAge from '../errors/driver-under-age';
import Person, { PersonProps } from '../person/person';
import License from './license';

interface Props extends PersonProps {
  license: License;
}

export default class Driver extends Person {
  private _license: License;

  private isUnderAge(birthDate: Date): boolean {
    const age = new Date().getFullYear() - birthDate.getFullYear();
    return age < 18; // TODO: Resolve magic number
  }

  constructor(props: Replace<Props, { createdAt?: Date }>) {
    super(props);
    if (this.isUnderAge(props.birthDate)) {
      throw new DriverUnderAge();
    }
    this._license = props.license;
  }

  public get license(): License {
    return this._license;
  }
}
