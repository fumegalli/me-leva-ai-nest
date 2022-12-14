import BaseEntity from '../base-entity';

export interface Props {
  startingPoint: number;
  endingPoint: number;
  passengerId: string;
  vehicleId: string;
  driverId: string;
  startedAt?: Date;
  endedAt?: Date;
  estimatedArrivalTimeInMinutes?: number;
  estimatedFare?: number;
  fare?: number;
}

export default class Ride extends BaseEntity {
  private readonly MIN_TIME_IN_MINUTES = 10;
  private readonly MAX_TIME_IN_MINUTES = 30;
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

  public get endedAt(): Date | null {
    return this.props.endedAt;
  }

  public finish(): void {
    this.props.endedAt = new Date();
  }

  public get estimatedArrivalTime() {
    return this.props.estimatedArrivalTimeInMinutes;
  }

  public estimateArrivalTime() {
    const interval = this.MAX_TIME_IN_MINUTES - this.MIN_TIME_IN_MINUTES;
    this.props.estimatedArrivalTimeInMinutes =
      Math.random() * interval + this.MIN_TIME_IN_MINUTES;
  }

  public estimateFare(fare: number) {
    this.props.estimatedFare = fare;
  }

  public fare(fare: number) {
    this.props.fare = fare;
  }

  public get getFare() {
    return this.props.fare;
  }

  public get passengerId() {
    return this.props.passengerId;
  }
}
