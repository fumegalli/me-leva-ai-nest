export default class DriverNotFound extends Error {
  constructor() {
    super('Driver not found');
  }
}
