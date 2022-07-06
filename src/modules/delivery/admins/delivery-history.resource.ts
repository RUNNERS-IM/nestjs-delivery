// Entity
import { DeliveryHistoryEntity } from '../entities/delivery-history.entity';

// Option
import { deliveryHistoryResourceOptions } from './options/delivery-history.response.options';

// Main section
export const deliveryHistoryResource = {
  resource: DeliveryHistoryEntity,
  options: deliveryHistoryResourceOptions,
};
