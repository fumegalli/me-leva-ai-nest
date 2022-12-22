import BaseEntity from '../base-entity';
import ExpiredLicense from '../errors/expired-license';

interface Props {
  category: string;
  expiresAt: Date;
}

export default class License extends BaseEntity {
  private props: Props;

  private isExpired(expiresAt: Date): boolean {
    return expiresAt.getTime() < new Date().getTime();
  }

  constructor(props: Props) {
    super();
    if (this.isExpired(props.expiresAt)) throw new ExpiredLicense();
    this.props = props;
  }

  public get category(): string {
    return this.props.category;
  }
}
