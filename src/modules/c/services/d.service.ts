// Nestjs
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// Repository
import { DRepository } from '../repositories/d.repository';

// Service
import { CrudService } from '../../../common/crud.service';

// Entity
import { DEntity } from '../entities/d.entity';

// Main section
@Injectable()
export class DService extends CrudService<DEntity> {
  constructor(
    @InjectRepository(DRepository)
    private dRepository: DRepository,
  ) {
    super( dRepository );
  }
}
