import Ride, { Props } from '@application/entities/ride/ride';

export function makeRide(override: Partial<Props> = {}) {
  return new Ride({
    startingPoint: 1,
    endingPoint: 2,
    passengerId: 'passengerId',
    vehicleId: 'vehicleId',
    driverId: 'driverId',
    ...override,
  });
}

export function makeStartedRide(override: Partial<Props> = {}) {
  return new Ride({
    startingPoint: 1,
    endingPoint: 2,
    passengerId: 'passengerId',
    vehicleId: 'vehicleId',
    driverId: 'driverId',
    startedAt: new Date(),
    estimatedArrivalTimeInMinutes: 10,
    estimatedFare: 120,
    ...override,
  });
}
