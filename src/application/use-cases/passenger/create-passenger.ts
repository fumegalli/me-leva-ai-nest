import Email from '@application/entities/person/email';
import Passenger from '../../entities/passenger/passenger';
import PassengersRepository from '../../repositories/passengers-repository';

interface Input {
  birthDate: Date;
  email: string;
  fullName: string;
}

export default class CreatePassenger {
  constructor(private readonly passengersRepo: PassengersRepository) {}

  async execute(input: Input) {
    const passenger = new Passenger({
      birthDate: input.birthDate,
      email: new Email(input.email),
      fullName: input.fullName,
    });

    await this.passengersRepo.create(passenger);

    return { passenger };
  }
}
