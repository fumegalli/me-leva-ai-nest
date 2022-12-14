import Ride from './ride';

describe('Ride', () => {
  it('should be able to create a ride', () => {
    const ride = new Ride({
      startingPoint: 1,
      endingPoint: 2,
      passangerId: '123',
      vehicleId: '456',
    });

    expect(ride).toBeTruthy();
  });
});
