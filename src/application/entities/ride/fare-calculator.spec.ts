import FareCalculator from './fare-calculator';

describe('Fare Calculator', () => {
  it('should estimate fare based on arrival time', () => {
    const arrivalTimeInMinutes = 10;
    const fare = FareCalculator.estimate(arrivalTimeInMinutes);

    expect(fare).toBe(120);
  });
});
