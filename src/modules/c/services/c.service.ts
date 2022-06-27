// Nestjs
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// Repository
import { CRepository } from '../repositories/c.repository';

// Service
import { CrudService } from '../../../common/crud.service';

// Entity
import { CEntity } from '../entities/c.entity';

// Main section
@Injectable()
export class CService extends CrudService<CEntity> {
  constructor(
    @InjectRepository(CRepository)
    private cRepository: CRepository,
  ) {
    super( cRepository );
  }
}
