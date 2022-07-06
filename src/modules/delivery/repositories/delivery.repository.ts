// Typeorm
import { EntityRepository, Repository } from 'typeorm';

// Entity
import { DeliveryEntity } from '../entities/delivery.entity';

// Main section
@EntityRepository(DeliveryEntity)
export class DeliveryRepository extends Repository<DeliveryEntity> {}
