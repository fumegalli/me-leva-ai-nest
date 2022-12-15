import Email from '../../../../src/application/entities/person/email';
import Passanger from '../../entities/passanger/passanger';
import PassangersRepository from '../../repositories/passangers-repository';

interface Input {
  birthDate: Date;
  email: string;
  fullName: string;
}

export default class CreatePassanger {
  constructor(private readonly passangersRepo: PassangersRepository) {}

  async execute(input: Input) {
    const passanger = new Passanger({
      birthDate: input.birthDate,
      email: new Email(input.email),
      fullName: input.fullName,
    });

    await this.passangersRepo.create(passanger);

    return { passanger };
  }
}
