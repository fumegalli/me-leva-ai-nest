import InsufficientBalance from '@application/entities/errors/insufficient-balance';

export default class Wallet {
  private _balance = 0;

  public get balance(): number {
    return this._balance;
  }

  public withdraw(amount: number) {
    if (amount > this._balance) throw new InsufficientBalance();
    this._balance -= amount;
  }

  public deposit(amount: number) {
    this._balance += amount;
  }
}
