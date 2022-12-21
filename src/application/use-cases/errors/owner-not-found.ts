export default class OwnerNotFound extends Error {
  constructor() {
    super('Owner not found');
  }
}
