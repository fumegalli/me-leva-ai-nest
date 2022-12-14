import { randomUUID } from 'node:crypto';
import { Replace } from '../../helpers/Replace';
import Email from '../person/email';

export interface PersonProps {
  fullName: string;
  email: Email;
  birthDate: Date;
  createdAt: Date;
}

export default class Person {
  private _id: string;
  private props: PersonProps;

  constructor(props: Replace<PersonProps, { createdAt?: Date }>) {
    this._id = randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public get email(): string {
    return this.props.email.value;
  }

  public get birthDate(): Date {
    return this.props.birthDate;
  }
}
