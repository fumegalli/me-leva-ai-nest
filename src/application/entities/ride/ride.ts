import BaseEntity from '../base-entity';

interface Props {
  startingPoint: number;
  endingPoint: number;
  passangerId: string;
  vehicleId: string;
}

export default class Ride extends BaseEntity {
  private props: Props;

  constructor(props: Props) {
    super();
    this.props = props;
  }
}
