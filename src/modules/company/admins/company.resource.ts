// Entity
import { CompanyEntity } from '../entities/company.entity';

// Option
import { companyResourceOptions } from './options/company.response.options';

// Main section
export const companyResource = {
  resource: CompanyEntity,
  options: companyResourceOptions,
};
