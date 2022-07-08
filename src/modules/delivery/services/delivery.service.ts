// Nestjs
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// Repository
import { DeliveryRepository } from '../repositories/delivery.repository';

// Service
import { CrudService } from '../../../common/crud.service';

// Entity
import { DeliveryEntity } from '../entities/delivery.entity';
import { FindConditions } from 'typeorm';
import { SweetTrackerService } from '../../../shared/services/sweet-tracker.service';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';

// Main section
@Injectable()
export class DeliveryService extends CrudService<DeliveryEntity> {
  constructor(
    @InjectRepository(DeliveryRepository)
    private deliveryRepository: DeliveryRepository,
    private sweetTrackerService: SweetTrackerService,
  ) {
    super(deliveryRepository);
  }

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
}
