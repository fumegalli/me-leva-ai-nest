export default class DriverUnderAge extends Error {
  constructor() {
    super('Driver is under age');
  }
}
