interface Props {
  code: number;
  category: string;
  expiresAt: Date;
}

export default class License {
  private props: Props;

  private isExpired(expiresAt: Date): boolean {
    return expiresAt.getTime() < new Date().getTime();
  }

  constructor(props: Props) {
    if (this.isExpired(props.expiresAt)) throw new Error('Expired license');
    this.props = props;
  }

  public get category(): string {
    return this.props.category;
  }
}
