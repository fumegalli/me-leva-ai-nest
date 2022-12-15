import PassangersRepository from '../../src/application/repositories/passangers-repository';
import Passanger from '../../src/application/entities/passanger/passanger';

export default class InMemoryPassangersRepository
  implements PassangersRepository
{
  public passangers: Passanger[] = [];

  async create(passanger: Passanger): Promise<void> {
    this.passangers.push(passanger);
  }
}
