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
import { DeliveryHistoryEntity } from '../entities/delivery-history.entity';

// Main section
export class DeliveryHistoryCreateResponse extends CreateResponse<DeliveryHistoryEntity> {
  @ApiPropertyOptional({ type: DeliveryHistoryEntity })
  data?: DeliveryHistoryEntity; // 결과 데이터
}
export class DeliveryHistoryListResponse extends ListResponse<DeliveryHistoryEntity> {
  @ApiPropertyOptional({ type: [DeliveryHistoryEntity], isArray: true })
  data?: DeliveryHistoryEntity[]; // 결과 데이터
}
export class DeliveryHistoryRetrieveResponse extends RetrieveResponse<DeliveryHistoryEntity> {
  @ApiPropertyOptional({ type: DeliveryHistoryEntity })
  data?: DeliveryHistoryEntity; // 결과 데이터
}
export class DeliveryHistoryUpdateResponse extends UpdateResponse<DeliveryHistoryEntity> {
  @ApiPropertyOptional({ type: DeliveryHistoryEntity })
  data?: DeliveryHistoryEntity; // 결과 데이터
}
export class DeliveryHistoryDeleteResponse extends DeleteResponse<DeliveryHistoryEntity> {
  @ApiPropertyOptional({ type: DeliveryHistoryEntity })
  data?: DeliveryHistoryEntity; // 결과 데이터
}
