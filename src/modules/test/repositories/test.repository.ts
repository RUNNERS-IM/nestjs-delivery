// Typeorm
import { EntityRepository, Repository } from 'typeorm';
// Entity
import { TestEntity } from '../entities/test.entity';
// Main section
@EntityRepository(TestEntity)
export class TestRepository extends Repository<TestEntity> {}
