// Entity
import { DeliveryEntity } from '../entities/delivery.entity';

// Option
import { deliveryResourceOptions } from './options/delivery.response.options';

// Main section
export const deliveryResource = {
  resource: DeliveryEntity,
  options: deliveryResourceOptions,
};
