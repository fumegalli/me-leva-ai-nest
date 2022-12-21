import FareCalculator from './fare-calculator';

describe('Fare Calculator', () => {
  it('should be able to estimate fare based on arrival time', () => {
    const arrivalTimeInMinutes = 10;
    const fare = FareCalculator.estimate(arrivalTimeInMinutes);

    expect(fare).toBe(120);
  });

  it('should be able to calculate fare based on starting end ending time', () => {
    const diffInMinutes = 10;
    const startingTime = new Date();
    const endingTime = new Date(startingTime.getTime() + diffInMinutes * 60000);
    const fare = FareCalculator.calculate(startingTime, endingTime);

    expect(fare).toBe(120);
  });
});
