import BaseEntity from '../base-entity';

export interface Props {
  model: string;
  category: string;
  ownerId: string;
}

export default class Vehicle extends BaseEntity {
  private props: Props;

  constructor(props: Props) {
    super();
    this.props = props;
  }

  public get ownerId(): string {
    return this.props.ownerId;
  }
}
