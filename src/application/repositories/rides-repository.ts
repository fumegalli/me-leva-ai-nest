import Ride from '../entities/ride/ride';

export default abstract class RidesRepository {
  abstract create(ride: Ride): Promise<void>;
}
