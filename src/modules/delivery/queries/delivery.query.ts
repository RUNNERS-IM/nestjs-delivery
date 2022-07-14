// Nestjs
import { PartialType, PickType } from '@nestjs/swagger';

// Entity
import { DeliveryEntity } from '../entities/delivery.entity';

// Main section
export class DeliveryQuery extends PickType(PartialType(DeliveryEntity), [
  'title',
  'code',
  'invoice',
  'level',
  'isComplete',
] as const) {}
