// Nestjs
import { PartialType, PickType } from '@nestjs/swagger';

// Entity
import { CEntity } from '../entities/c.entity';

// Main section
export class UpdateCDto extends PickType(PartialType(CEntity), [
'title',
'number',
] as const) {}
