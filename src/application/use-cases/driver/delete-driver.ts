import DriversRepository from '../../repositories/drivers-repository';
import DriverNotFound from '../errors/driver-not-found';

export default class DeleteDriver {
  constructor(private readonly driversRepo: DriversRepository) {}

  async execute(id: string) {
    const driver = await this.driversRepo.findById(id);
    if (!driver) throw new DriverNotFound();
    await this.driversRepo.deleteById(id);
  }
}
