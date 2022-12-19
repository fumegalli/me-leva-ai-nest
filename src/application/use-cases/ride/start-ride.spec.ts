import makeRide from '@test/factories/ride-factory';
import InMemoryRidesRepository from '@test/repositories/in-memory-rides-repository';
import RideNotFound from '../errors/ride-not-found';
import StartRide from './start-ride';

describe('Start a ride', () => {
  it('should start a new ride', async () => {
    const ridesRepo = new InMemoryRidesRepository();
    const ride = makeRide();
    ridesRepo.create(ride);
    const startRide = new StartRide(ridesRepo);
    const { estimatedArrivalTimeInMinutes, estimatedFare } =
      await startRide.execute({
        rideId: ride.id,
      });

    expect(ride.startedAt).toEqual(expect.any(Date));
    expect(estimatedArrivalTimeInMinutes).toEqual(expect.any(Number));
    expect(estimatedFare).toEqual(expect.any(Number));
  });

  it('should throw RideNotFound when a ride was not found', async () => {
    const ridesRepo = new InMemoryRidesRepository();
    const startRide = new StartRide(ridesRepo);

    expect(() => {
      return startRide.execute({
        rideId: 'fake-id',
      });
    }).rejects.toThrow(RideNotFound);
  });
});
