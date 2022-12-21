import PassengersRepository from '@application/repositories/passengers-repository';
import InvalidWithdraw from '../errors/invalid-withdraw';
import PassengerNotFound from '../errors/passenger-not-found';

interface Input {
  passengerId: string;
  amount: number;
}

export default class Withdraw {
  constructor(private readonly passengersRepo: PassengersRepository) {}

  async execute(input: Input): Promise<void> {
    const isAmountGreaterThanZero = input.amount > 0;
    if (!isAmountGreaterThanZero) throw new InvalidWithdraw();
    const passenger = await this.passengersRepo.findById(input.passengerId);
    if (!passenger) throw new PassengerNotFound();
    passenger.withdraw(input.amount);
    await this.passengersRepo.save(passenger);
  }
}
