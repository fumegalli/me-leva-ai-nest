export default class InvalidDeposit extends Error {
  constructor() {
    super('Amount must be greater than 0');
  }
}
