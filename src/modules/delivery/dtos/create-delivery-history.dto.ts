// Nestjs
import { PartialType, PickType } from '@nestjs/swagger';

// Entity
import { DeliveryHistoryEntity } from '../entities/delivery-history.entity';

// Main section
export class CreateDeliveryHistoryDto extends PickType(PartialType(DeliveryHistoryEntity), [
  'title',
  'number',
] as const) {}
