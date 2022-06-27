// Nestjs
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// Repository
import { TestRepository } from '../repositories/test.repository';
// Service
import { CrudService } from '../../../common/crud.service';
// Entity
import { TestEntity } from '../entities/test.entity';
// Main section
@Injectable()
export class TestService extends CrudService<TestEntity> {
  constructor(
    @InjectRepository(TestRepository)
    private testRepository: TestRepository,
  ) {
    super( testRepository );
  }
}
