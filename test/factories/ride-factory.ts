import Ride, { Props } from '@application/entities/ride/ride';

export default function makeRide(override: Partial<Props> = {}) {
  return new Ride({
    startingPoint: 1,
    endingPoint: 2,
    passengerId: 'passengerId',
    vehicleId: 'vehicleId',
    ...override,
  });
}
