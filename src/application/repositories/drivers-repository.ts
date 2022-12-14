import Driver from '../entities/driver/driver';

export default abstract class DriversRepository {
  abstract create(driver: Driver): Promise<void>;
  abstract deleteById(id: string): Promise<void>;
  abstract findById(id: string): Promise<Driver | null>;
}
