// Entity
import { LemonSymphonyEntity } from '../entities/lemon-symphony.entity';

// Option
import { lemonSymphonyResourceOptions } from './options/lemon-symphony.response.options';

// Main section
export const lemonSymphonyResource = {
  resource: LemonSymphonyEntity,
  options: lemonSymphonyResourceOptions,
};
