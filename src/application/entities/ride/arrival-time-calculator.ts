export default class ArrivalTimeCalculator {
  static MIN_TIME_IN_MINUTES = 10;
  static MAX_TIME_IN_MINUTES = 30;

  static estimate() {
    const interval =
      ArrivalTimeCalculator.MAX_TIME_IN_MINUTES -
      ArrivalTimeCalculator.MIN_TIME_IN_MINUTES;
    return Math.random() * interval + ArrivalTimeCalculator.MIN_TIME_IN_MINUTES;
  }
}
