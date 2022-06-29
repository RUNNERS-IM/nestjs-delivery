// Typeorm
import { EntityRepository, Repository } from 'typeorm';

// Entity
import { LemonEntity } from '../entities/lemon.entity';

// Main section
@EntityRepository(LemonEntity)
export class LemonRepository extends Repository<LemonEntity> {}
