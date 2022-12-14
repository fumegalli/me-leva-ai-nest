import Vehicle from './vehicle';

describe('Vechicle', () => {
  it('should be able to create a vehicle', () => {
    const vechicle = new Vehicle({
      model: 'Tesla X',
      category: 'B',
      ownerId: '123',
    });

    expect(vechicle).toBeTruthy();
  });
});
