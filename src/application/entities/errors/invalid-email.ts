export default class InvalidEmail extends Error {
  constructor() {
    super('Invalid email');
  }
}
