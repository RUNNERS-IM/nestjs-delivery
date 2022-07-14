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
    const dataDelivery = await this.sweetTrackerService.getDelivery(entity.invoice, entity.code);

    for (const key in dataDelivery) {
      entity[key] = dataDelivery[key];
    }
  }

  async updateDeliveryHistories(entity: DeliveryEntity, event) {
    const { deliveryHistories } = await this.sweetTrackerService.getDelivery(
      entity.invoice,
      entity.code,
    );

    // Remove past histories
    const deliveryHistoryRepository = event.manager.getRepository(DeliveryHistoryEntity);
    await deliveryHistoryRepository.delete({ deliveryId: entity.id });

    // Create new histories
    for (const [index, deliveryHistory] of deliveryHistories.entries()) {
      const deliveryHistoryEntity: DeliveryHistoryEntity = {
        deliveryId: entity.id,
        order: Number(index) + 1,
        ...deliveryHistory,
      };
      await deliveryHistoryRepository.save(deliveryHistoryEntity);
    }
  }

  // Listener section
  async beforeInsert(event: InsertEvent<DeliveryEntity>) {
    await this.updateDelivery(event.entity, event);
  }
  async afterInsert(event: InsertEvent<DeliveryEntity>) {
    await this.updateDeliveryHistories(event.entity, event);
  }

  async beforeUpdate(event: UpdateEvent<DeliveryEntity>) {}
  async afterUpdate(event: UpdateEvent<DeliveryEntity>) {}
}
