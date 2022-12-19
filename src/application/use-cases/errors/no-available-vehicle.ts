export default class NoAvailableVehicle extends Error {
  constructor() {
    super('No available vehicle');
  }
}
