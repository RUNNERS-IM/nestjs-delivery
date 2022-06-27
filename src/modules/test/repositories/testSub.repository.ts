// Typeorm
import { EntityRepository, Repository } from 'typeorm';
// Entity
import { TestSubEntity } from '../entities/testSub.entity';
// Main section
@EntityRepository(TestSubEntity)
export class TestRepository extends Repository<TestSubEntity> {}
