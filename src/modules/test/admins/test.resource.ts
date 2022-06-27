// Entity
import { TestEntity } from '../entities/test.entity';
// Option
import { testResourceOptions } from './options/test.response.options';
// Main section
export const testResource = {
  resource: TestEntity,
  options: testResourceOptions,
};
