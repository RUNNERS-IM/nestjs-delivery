// Nestjs
import { PartialType, PickType } from '@nestjs/swagger';

// Entity
import { DeliveryEntity } from '../entities/delivery.entity';

// Main section
export class DeliveryDto extends PickType(PartialType(DeliveryEntity), [
  'title',
  'code',
  'invoice',
  'level',
  'estimate',
  'isComplete',
  'nameSender',
  'callOffice',
  'callDriver',
  'nameDriver',
  'addressReceiver',
  'nameReceiver',
  'isTrackingRegistered',
] as const) {}
