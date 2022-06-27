// Typeorm
import { EntityRepository, Repository } from 'typeorm';

// Entity
import { CEntity } from '../entities/c.entity';

// Main section
@EntityRepository(CEntity)
export class CRepository extends Repository<CEntity> {}
