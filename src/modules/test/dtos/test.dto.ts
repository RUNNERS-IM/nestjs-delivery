// Nestjs
import { PartialType, PickType } from '@nestjs/swagger';
// Entity
import { TestEntity } from '../entities/test.entity';
// Main section
export class TestDto extends PickType(PartialType(TestEntity), [
  'title',
  'number',
] as const) {}
