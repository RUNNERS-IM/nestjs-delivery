// Nestjs
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// Repository
import { TestRepository } from '../repositories/testSub.repository';
// Service
import { CrudService } from '../../../common/crud.service';
// Entity
import { TestSubEntity } from '../entities/testSub.entity';

// Main section
@Injectable()
export class TestService extends CrudService<TestSubEntity> {
  constructor(
    @InjectRepository(TestRepository)
    private testRepository: TestRepository,
  ) {
    super(testRepository);
  }
}
