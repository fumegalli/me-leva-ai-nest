import Vehicle, { Props } from '@application/entities/Vehicle/Vehicle';

export default function makeVehicle(override: Partial<Props> = {}) {
  return new Vehicle({
    category: 'B',
    model: 'Tesla X',
    ownerId: '1234',
    ...override,
  });
}
