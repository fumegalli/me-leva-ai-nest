import DriversRepository from '../repositories/drivers-repository';

export default class DeleteDriver {
  constructor(private readonly driversRepo: DriversRepository) {}

  async execute(id: string) {
    const driver = await this.driversRepo.findById(id);
    if (!driver) throw new Error('Driver not found');
    await this.driversRepo.deleteById(id);
  }
}
