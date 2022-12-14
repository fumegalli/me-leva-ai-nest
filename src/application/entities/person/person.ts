import BaseEntity from '../base-entity';
import Email from '../person/email';

export interface PersonProps {
  fullName: string;
  email: Email;
  birthDate: Date;
}

export default class Person extends BaseEntity {
  private props: PersonProps;

  constructor(props: PersonProps) {
    super();
    this.props = props;
  }
}
