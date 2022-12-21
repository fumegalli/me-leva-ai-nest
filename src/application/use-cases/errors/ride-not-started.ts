export default class RideNotStarted extends Error {
  constructor() {
    super('Ride not started yet');
  }
}
