export default class FareCalculator {
  static FARE_PER_MINUTE = 12;

  static estimate(estimatedTimeInMinutes: number) {
    const fare = estimatedTimeInMinutes * FareCalculator.FARE_PER_MINUTE;
    return fare;
  }

  static calculate(startingTime: Date, endingTime: Date) {
    const diff = endingTime.getTime() - startingTime.getTime();
    const diffInMinutes = diff / 60000;
    return diffInMinutes * FareCalculator.FARE_PER_MINUTE;
  }
}
