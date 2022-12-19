import Ride from '../entities/ride/ride';

export default abstract class RidesRepository {
  abstract create(ride: Ride): Promise<void>;
  abstract findById(id: string): Promise<Ride | null>;
  abstract save(ride: Ride): Promise<void>;
}
