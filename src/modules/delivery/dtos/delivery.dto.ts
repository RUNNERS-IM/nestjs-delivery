// Nestjs
import { PartialType, PickType } from '@nestjs/swagger';

// Entity
import { DeliveryEntity } from '../entities/delivery.entity';

// Main section
export class DeliveryDto extends PickType(PartialType(DeliveryEntity), [
  'title',
  'number',
] as const) {}
