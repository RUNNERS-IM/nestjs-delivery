// Nestjs
import { PartialType, PickType } from '@nestjs/swagger';

// Entity
import { DeliveryHistoryEntity } from '../entities/delivery-history.entity';

// Main section
export class DeliveryHistoryDto extends PickType(PartialType(DeliveryHistoryEntity), [
  'title',
  'number',
] as const) {}
