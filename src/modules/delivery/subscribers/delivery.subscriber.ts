// Typeorm
import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';

// Nestjs
// Service
import { SweetTrackerService } from '../../../shared/services/sweet-tracker.service';

// Entity
import { DeliveryEntity } from '../entities/delivery.entity';
import { DeliveryHistoryEntity } from '../entities/delivery-history.entity';

// Main section

@EventSubscriber()
export class DeliverySubscriber implements EntitySubscriberInterface<DeliveryEntity> {
  constructor(
    readonly connection: Connection,
    private readonly sweetTrackerService: SweetTrackerService,
  ) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return DeliveryEntity;
  }

  // Function section
  async updateDelivery(entity: DeliveryEntity, event) {
    const { nameSender, nameReceiver, title, level, estimate, isComplete, deliveryHistories } =
      await this.sweetTrackerService.getDelivery(entity.invoice, entity.code);

    entity.nameReceiver = nameReceiver;
    entity.nameSender = nameSender;
    entity.title = title;
    entity.level = level;
    entity.estimate = estimate;
    entity.isComplete = isComplete;

    // Remove past histories
    const deliveryHistoryRepository = event.manager.getRepository(DeliveryHistoryEntity);
    await deliveryHistoryRepository.delete({ deliveryId: entity.id });

    // Create new histories
    for (const deliveryHistory of deliveryHistories) {
      const deliveryHistoryEntity: DeliveryHistoryEntity = {
        deliveryId: entity.id,
        ...deliveryHistory,
      };
      await deliveryHistoryRepository.save(deliveryHistoryEntity);
    }
  }

  // Listener section
  async beforeInsert(event: InsertEvent<DeliveryEntity>) {}

  async beforeUpdate(event: UpdateEvent<DeliveryEntity>) {}

  async afterInsert(event: InsertEvent<DeliveryEntity>) {
    await this.updateDelivery(event.entity, event);
  }

  async afterUpdate(event: UpdateEvent<DeliveryEntity>) {
    await this.updateDelivery(event.entity as DeliveryEntity, event);
  }
}
