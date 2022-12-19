import BaseEntity from '../base-entity';

export interface Props {
  startingPoint: number;
  endingPoint: number;
  passengerId: string;
  vehicleId: string;
  driverId: string;
  startedAt?: Date;
  estimatedArrivalTimeInMinutes?: number;
  estimatedFare?: number;
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

  public get driverId(): string {
    return this.props.driverId;
  }

  public get startedAt(): Date | null {
    return this.props.startedAt;
  }

  public start(): void {
    this.props.startedAt = new Date();
  }

  public estimateArrivalTime(arrivalTimeInMinutes: number) {
    this.props.estimatedArrivalTimeInMinutes = arrivalTimeInMinutes;
  }

  public estimateFare(fare: number) {
    this.props.estimatedFare = fare;
  }
}
