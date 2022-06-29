// Nestjs
import { PartialType, PickType } from '@nestjs/swagger';

// Entity
import { LemonEntity } from '../entities/lemon.entity';

// Main section
export class LemonDto extends PickType(PartialType(LemonEntity), [
  'title',
  'number',
] as const) {}
