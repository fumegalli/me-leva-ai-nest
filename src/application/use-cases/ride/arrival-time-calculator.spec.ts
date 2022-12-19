import ArrivalTimeCalculator from './arrival-time-calculator';

describe('Arrival Time Calculator', () => {
  it('should estimate arrival time in minutes randomly between 10 and 30', () => {
    const timeInMinutes = ArrivalTimeCalculator.estimate();

    expect(timeInMinutes).toBeGreaterThanOrEqual(10);
    expect(timeInMinutes).toBeLessThanOrEqual(30);
  });
});
