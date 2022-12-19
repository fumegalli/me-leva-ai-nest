import BaseEntity from '../base-entity';
import Email from '../person/email';
import Wallet from './wallet';

export interface PersonProps {
  fullName: string;
  email: Email;
  birthDate: Date;
  wallet?: Wallet;
}

export default class Person extends BaseEntity {
  private props: PersonProps;

  constructor(props: PersonProps) {
    super();
    this.props = {
      ...props,
      wallet: new Wallet(),
    };
  }

  public withdraw(amount: number) {
    this.props.wallet.withdraw(amount);
  }

  public deposit(amount: number) {
    this.props.wallet.deposit(amount);
  }

  public get wallet() {
    return this.props.wallet;
  }
}
