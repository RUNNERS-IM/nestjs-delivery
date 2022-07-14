// Nestjs
import { ApiPropertyOptional } from '@nestjs/swagger';

// Response
import {
  CreateResponse,
  DeleteResponse,
  ListResponse,
  RetrieveResponse,
  UpdateResponse,
} from '../../../constants/response';

// Entity
import { CompanyEntity } from '../entities/company.entity';

// Main section
export class CompanyCreateResponse extends CreateResponse<CompanyEntity> {
  @ApiPropertyOptional({ type: CompanyEntity })
  data?: CompanyEntity; // 결과 데이터
}
export class CompanyListResponse extends ListResponse<CompanyEntity> {
  @ApiPropertyOptional({ type: [CompanyEntity], isArray: true })
  data?: CompanyEntity[]; // 결과 데이터
}
export class CompanyRetrieveResponse extends RetrieveResponse<CompanyEntity> {
  @ApiPropertyOptional({ type: CompanyEntity })
  data?: CompanyEntity; // 결과 데이터
}
export class CompanyUpdateResponse extends UpdateResponse<CompanyEntity> {
  @ApiPropertyOptional({ type: CompanyEntity })
  data?: CompanyEntity; // 결과 데이터
}
export class CompanyDeleteResponse extends DeleteResponse<CompanyEntity> {
  @ApiPropertyOptional({ type: CompanyEntity })
  data?: CompanyEntity; // 결과 데이터
}
