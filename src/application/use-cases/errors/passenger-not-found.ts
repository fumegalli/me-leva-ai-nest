export default class PassengerNotFound extends Error {
  constructor() {
    super('Passenger not found');
  }
}
