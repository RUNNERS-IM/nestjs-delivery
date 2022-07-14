// Nestjs
import { PartialType, PickType } from '@nestjs/swagger';

// Entity
import { CompanyEntity } from '../entities/company.entity';

// Main section
export class UpdateCompanyDto extends PickType(PartialType(CompanyEntity), [
'title',
'number',
] as const) {}
