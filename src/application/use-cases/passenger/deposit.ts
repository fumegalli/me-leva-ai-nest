import PassengersRepository from '@application/repositories/passengers-repository';
import InvalidDeposit from '../errors/invalid-deposit';
import PassengerNotFound from '../errors/passenger-not-found';

interface Input {
  passengerId: string;
  amount: number;
}

export default class Deposit {
  constructor(private readonly passengersRepo: PassengersRepository) {}

  async execute(input: Input): Promise<void> {
    const isAmountGreaterThanZero = input.amount > 0;
    if (!isAmountGreaterThanZero) throw new InvalidDeposit();
    const passenger = await this.passengersRepo.findById(input.passengerId);
    if (!passenger) throw new PassengerNotFound();
    passenger.deposit(input.amount);
    await this.passengersRepo.save(passenger);
  }
}
