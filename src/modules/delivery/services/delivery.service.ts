// Nestjs
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// Repository
import { DeliveryRepository } from '../repositories/delivery.repository';

// Service
import { CrudService } from '../../../common/crud.service';

// Entity
import { DeliveryEntity } from '../entities/delivery.entity';
import { FindConditions, MoreThan } from 'typeorm';
import { SweetTrackerService } from '../../../shared/services/sweet-tracker.service';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { DeliveryHistoryEntity } from '../entities/delivery-history.entity';
import { DeliveryHistoryRepository } from '../repositories/delivery-history.repository';

// Main section
@Injectable()
export class DeliveryService extends CrudService<DeliveryEntity> {
  constructor(
    @InjectRepository(DeliveryRepository)
    private deliveryRepository: DeliveryRepository,

    @InjectRepository(DeliveryHistoryRepository)
    private deliveryHistoryRepository: DeliveryHistoryRepository,

    private sweetTrackerService: SweetTrackerService,
  ) {
    super(deliveryRepository);
  }

  // Get
  public async getTemplate(
    idOrOptionsOrConditions?:
      | string
      | number
      | FindOneOptions<DeliveryEntity>
      | FindConditions<DeliveryEntity>,
    maybeOptions?: FindOneOptions<DeliveryEntity>,
  ) {
    const delivery = await this.deliveryRepository.findOneOrFail(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      idOrOptionsOrConditions as any,
      maybeOptions,
    );

    return this.sweetTrackerService.getDeliveryTemplate(delivery.invoice, delivery.code);
  }

  // Function section
  async track(entity: DeliveryEntity) {
    const dataDelivery = await this.sweetTrackerService.getDelivery(entity.invoice, entity.code);

    for (const key in dataDelivery) {
      entity[key] = dataDelivery[key];
    }

    const { deliveryHistories } = await this.sweetTrackerService.getDelivery(
      entity.invoice,
      entity.code,
    );

    // Create new histories
    for (const [index, deliveryHistory] of deliveryHistories.entries()) {
      const deliveryHistoryEntity: DeliveryHistoryEntity = {
        deliveryId: entity.id,
        order: Number(index) + 1,
        ...deliveryHistory,
      };
      const result = await this.deliveryHistoryRepository.upsert(deliveryHistoryEntity, [
        'deliveryId',
        'order',
      ]);
    }
  }

  public async updateUncompleted() {
    var date = new Date();
    date.setMonth(date.getMonth() - 1);

    const deliveries: DeliveryEntity[] = await this.find({
      // isComplete: false,
      createdAt: MoreThan(date),
    });

    for (const delivery of deliveries) {
      await this.track(delivery);
    }
  }
}
