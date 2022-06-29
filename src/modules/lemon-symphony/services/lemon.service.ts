// Nestjs
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// Repository
import { LemonRepository } from '../repositories/lemon.repository';

// Service
import { CrudService } from '../../../common/crud.service';

// Entity
import { LemonEntity } from '../entities/lemon.entity';

// Main section
@Injectable()
export class LemonService extends CrudService<LemonEntity> {
  constructor(
    @InjectRepository(LemonRepository)
    private lemonRepository: LemonRepository,
  ) {
    super( lemonRepository );
  }
}
