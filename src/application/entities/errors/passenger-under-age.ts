export default class PassengerUnderAge extends Error {
  constructor() {
    super('Passenger is under age');
  }
}
