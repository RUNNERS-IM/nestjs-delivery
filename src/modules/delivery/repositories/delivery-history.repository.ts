// Typeorm
import { EntityRepository, Repository } from 'typeorm';

// Entity
import { DeliveryHistoryEntity } from '../entities/delivery-history.entity';

// Main section
@EntityRepository(DeliveryHistoryEntity)
export class DeliveryHistoryRepository extends Repository<DeliveryHistoryEntity> {}
