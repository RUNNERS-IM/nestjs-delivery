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
import { CEntity } from '../entities/c.entity';

// Main section
export class CCreateResponse extends CreateResponse<CEntity> {
  @ApiPropertyOptional({ type: CEntity })
  data?: CEntity; // 결과 데이터
}
export class CListResponse extends ListResponse<CEntity> {
  @ApiPropertyOptional({ type: [CEntity], isArray: true })
  data?: CEntity[]; // 결과 데이터
}
export class CRetrieveResponse extends RetrieveResponse<CEntity> {
  @ApiPropertyOptional({ type: CEntity })
  data?: CEntity; // 결과 데이터
}
export class CUpdateResponse extends UpdateResponse<CEntity> {
  @ApiPropertyOptional({ type: CEntity })
  data?: CEntity; // 결과 데이터
}
export class CDeleteResponse extends DeleteResponse<CEntity> {
  @ApiPropertyOptional({ type: CEntity })
  data?: CEntity; // 결과 데이터
}
