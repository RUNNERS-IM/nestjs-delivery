// Typeorm
import { EntityRepository, Repository } from 'typeorm';

// Entity
import { LemonSymphonyEntity } from '../entities/lemon-symphony.entity';

// Main section
@EntityRepository(LemonSymphonyEntity)
export class LemonSymphonyRepository extends Repository<LemonSymphonyEntity> {}
