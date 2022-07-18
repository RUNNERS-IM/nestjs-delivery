// Nestjs
import { PartialType, PickType } from '@nestjs/swagger';

// Entity
import { CompanyEntity } from '../entities/company.entity';

// Main section
export class CreateCompanyDto extends PickType(PartialType(CompanyEntity), [] as const) {}
