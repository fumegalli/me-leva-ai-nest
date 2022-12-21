import Ride, { Props } from '@application/entities/ride/ride';

const TEN_MINUTES_AGO = new Date(new Date().getTime() - 10 * 60000);

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
    startedAt: TEN_MINUTES_AGO,
    estimatedArrivalTimeInMinutes: 10,
    estimatedFare: 120,
    ...override,
  });
}
