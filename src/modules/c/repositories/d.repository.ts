// Typeorm
import { EntityRepository, Repository } from 'typeorm';

// Entity
import { DEntity } from '../entities/d.entity';

// Main section
@EntityRepository(DEntity)
export class DRepository extends Repository<DEntity> {}
