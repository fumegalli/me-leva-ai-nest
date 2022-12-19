export default class FareCalculator {
  static FARE_PER_MINUTE = 12;

  static estimate(estimatedTimeInMinutes: number) {
    const fare = estimatedTimeInMinutes * FareCalculator.FARE_PER_MINUTE;
    return fare;
  }
}
