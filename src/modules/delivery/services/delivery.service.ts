// Nestjs
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// Repository
import { DeliveryRepository } from '../repositories/delivery.repository';

// Service
import { CrudService } from '../../../common/crud.service';

// Entity
import { DeliveryEntity } from '../entities/delivery.entity';
import { SweetTrackerService } from '../../../shared/services/sweet-tracker.service';
import { DeliveryHistoryRepository } from '../repositories/delivery-history.repository';

// Main section
@Injectable()
export class DeliveryService extends CrudService<DeliveryEntity> {
  constructor(
    @InjectRepository(DeliveryRepository)
    private deliveryRepository: DeliveryRepository,
    private deliveryHistoryRepository: DeliveryHistoryRepository,
    private readonly sweetTrackerService: SweetTrackerService,
  ) {
    super(deliveryRepository);
  }

  // async create(entity: DeepPartial<DeliveryEntity>) {
  //   const { nameSender, nameReceiver, title, level, estimate, isComplete, deliveryHistories } =
  //     await this.sweetTrackerService.getDelivery(entity.invoice, entity.code);
  //
  //   entity.nameReceiver = nameReceiver;
  //   entity.nameSender = nameSender;
  //   entity.title = title;
  //   entity.level = level;
  //   entity.estimate = estimate;
  //   entity.isComplete = isComplete;
  //   const delivery = this.deliveryRepository.create(entity).save();
  //
  //   for (const deliveryHistory of deliveryHistories) {
  //     const data = { deliveryId: entity.id, ...deliveryHistory };
  //     console.log(data);
  //     this.deliveryHistoryRepository.create({ deliveryId: delivery.id, ...deliveryHistory }).save();
  //   }
  //   return delivery;
  // }
}
