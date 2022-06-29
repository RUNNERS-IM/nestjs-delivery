// Nestjs
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// Repository
import { LemonSymphonyRepository } from '../repositories/lemon-symphony.repository';

// Service
import { CrudService } from '../../../common/crud.service';

// Entity
import { LemonSymphonyEntity } from '../entities/lemon-symphony.entity';

// Main section
@Injectable()
export class LemonSymphonyService extends CrudService<LemonSymphonyEntity> {
  constructor(
    @InjectRepository(LemonSymphonyRepository)
    private lemonsymphonyRepository: LemonSymphonyRepository,
  ) {
    super( lemonsymphonyRepository );
  }
}
