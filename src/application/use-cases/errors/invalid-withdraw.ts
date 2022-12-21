export default class InvalidWithdraw extends Error {
  constructor() {
    super('Amount must be greater than 0');
  }
}
