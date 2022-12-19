export default class InsufficientBalance extends Error {
  constructor() {
    super('Insufficient balance');
  }
}
