// Typeorm
import { EntityRepository, Repository } from 'typeorm';

// Entity
import { CompanyEntity } from '../entities/company.entity';

// Main section
@EntityRepository(CompanyEntity)
export class CompanyRepository extends Repository<CompanyEntity> {}
