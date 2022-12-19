import BaseEntity from '../base-entity';

interface Props {
  startingPoint: number;
  endingPoint: number;
  passengerId: string;
  vehicleId: string;
}

export default class Ride extends BaseEntity {
  private props: Props;

  constructor(props: Props) {
    super();
    this.props = props;
  }

  public get vehicleId(): string {
    return this.props.vehicleId;
  }
}
