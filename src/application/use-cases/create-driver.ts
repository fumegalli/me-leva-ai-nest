import Driver from '../entities/driver/driver';
import License from '../entities/driver/license';
import Email from '../entities/person/email';
import DriversRepository from '../repositories/drivers-repository';

interface Input {
  birthDate: Date;
  email: string;
  fullName: string;
  license: {
    category: string;
    code: number;
    expiresAt: Date;
  };
}

export default class CreateDriver {
  constructor(private readonly driversRepo: DriversRepository) {}

  async execute(input: Input) {
    const driver = new Driver({
      birthDate: input.birthDate,
      email: new Email(input.email),
      fullName: input.fullName,
      license: new License(input.license),
    });

    await this.driversRepo.create(driver);

    return { driver };
  }
}
