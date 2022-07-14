// Nestjs
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// Repository
import { CompanyRepository } from '../repositories/company.repository';

// Service
import { CrudService } from '../../../common/crud.service';

// Entity
import { CompanyEntity } from '../entities/company.entity';

// Main section
@Injectable()
export class CompanyService extends CrudService<CompanyEntity> {
  constructor(
    @InjectRepository(CompanyRepository)
    private companyRepository: CompanyRepository,
  ) {
    super( companyRepository );
  }
}
