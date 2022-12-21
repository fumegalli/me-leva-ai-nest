export default class DriverNotAllowedToDriveVehicle extends Error {
  constructor() {
    super('Driver not allowed to drive this vehicle');
  }
}
