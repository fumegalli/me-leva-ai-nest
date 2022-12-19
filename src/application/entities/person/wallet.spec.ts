import InsufficientBalance from '../errors/insufficient-balance';
import Wallet from './wallet';

describe('Wallet', () => {
  it('should be able to create a wallet', () => {
    const wallet = new Wallet();

    expect(wallet).toBeTruthy();
  });

  it('should be able to deposit', () => {
    const wallet = new Wallet();
    wallet.deposit(100);

    expect(wallet.balance).toBe(100);
  });

  it('should be able to withdraw', () => {
    const wallet = new Wallet();
    wallet.deposit(100);
    wallet.withdraw(100);

    expect(wallet.balance).toBe(0);
  });

  it('should throw Insufficient Balance error when amount to withdraw is grater than balance', () => {
    const wallet = new Wallet();
    expect(() => wallet.withdraw(100)).toThrow(InsufficientBalance);
  });
});
