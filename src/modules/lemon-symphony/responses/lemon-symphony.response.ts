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
import { LemonSymphonyEntity } from '../entities/lemon-symphony.entity';

// Main section
export class LemonSymphonyCreateResponse extends CreateResponse<LemonSymphonyEntity> {
  @ApiPropertyOptional({ type: LemonSymphonyEntity })
  data?: LemonSymphonyEntity; // 결과 데이터
}
export class LemonSymphonyListResponse extends ListResponse<LemonSymphonyEntity> {
  @ApiPropertyOptional({ type: [LemonSymphonyEntity], isArray: true })
  data?: LemonSymphonyEntity[]; // 결과 데이터
}
export class LemonSymphonyRetrieveResponse extends RetrieveResponse<LemonSymphonyEntity> {
  @ApiPropertyOptional({ type: LemonSymphonyEntity })
  data?: LemonSymphonyEntity; // 결과 데이터
}
export class LemonSymphonyUpdateResponse extends UpdateResponse<LemonSymphonyEntity> {
  @ApiPropertyOptional({ type: LemonSymphonyEntity })
  data?: LemonSymphonyEntity; // 결과 데이터
}
export class LemonSymphonyDeleteResponse extends DeleteResponse<LemonSymphonyEntity> {
  @ApiPropertyOptional({ type: LemonSymphonyEntity })
  data?: LemonSymphonyEntity; // 결과 데이터
}
