export default class ExpiredLicense extends Error {
  constructor() {
    super('Expired license');
  }
}
