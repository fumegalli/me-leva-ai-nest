import Driver from '../entities/driver/driver';

export default abstract class DriversRepository {
  abstract create(driver: Driver): Promise<void>;
}
