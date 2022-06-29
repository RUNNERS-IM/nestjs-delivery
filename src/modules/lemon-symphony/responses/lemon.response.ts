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
import { LemonEntity } from '../entities/lemon.entity';

// Main section
export class LemonCreateResponse extends CreateResponse<LemonEntity> {
  @ApiPropertyOptional({ type: LemonEntity })
  data?: LemonEntity; // 결과 데이터
}
export class LemonListResponse extends ListResponse<LemonEntity> {
  @ApiPropertyOptional({ type: [LemonEntity], isArray: true })
  data?: LemonEntity[]; // 결과 데이터
}
export class LemonRetrieveResponse extends RetrieveResponse<LemonEntity> {
  @ApiPropertyOptional({ type: LemonEntity })
  data?: LemonEntity; // 결과 데이터
}
export class LemonUpdateResponse extends UpdateResponse<LemonEntity> {
  @ApiPropertyOptional({ type: LemonEntity })
  data?: LemonEntity; // 결과 데이터
}
export class LemonDeleteResponse extends DeleteResponse<LemonEntity> {
  @ApiPropertyOptional({ type: LemonEntity })
  data?: LemonEntity; // 결과 데이터
}
