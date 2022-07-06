// Nestjs
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// Repository
import { DeliveryHistoryRepository } from '../repositories/delivery-history.repository';

// Service
import { CrudService } from '../../../common/crud.service';

// Entity
import { DeliveryHistoryEntity } from '../entities/delivery-history.entity';

// Main section
@Injectable()
export class DeliveryHistoryService extends CrudService<DeliveryHistoryEntity> {
  constructor(
    @InjectRepository(DeliveryHistoryRepository)
    private deliveryhistoryRepository: DeliveryHistoryRepository,
  ) {
    super( deliveryhistoryRepository );
  }
}
