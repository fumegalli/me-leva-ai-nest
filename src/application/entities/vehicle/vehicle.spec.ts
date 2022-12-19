import Vehicle from './vehicle';

describe('Vehicle', () => {
  it('should be able to create a vehicle', () => {
    const vehicle = new Vehicle({
      model: 'Tesla X',
      category: 'B',
      ownerId: '123',
    });

    expect(vehicle).toBeTruthy();
  });
});
