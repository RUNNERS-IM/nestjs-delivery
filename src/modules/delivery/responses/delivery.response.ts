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
import { DeliveryEntity } from '../entities/delivery.entity';

// Main section
export class DeliveryCreateResponse extends CreateResponse<DeliveryEntity> {
  @ApiPropertyOptional({ type: DeliveryEntity })
  data?: DeliveryEntity; // 결과 데이터
}
export class DeliveryListResponse extends ListResponse<DeliveryEntity> {
  @ApiPropertyOptional({ type: [DeliveryEntity], isArray: true })
  data?: DeliveryEntity[]; // 결과 데이터
}
export class DeliveryRetrieveResponse extends RetrieveResponse<DeliveryEntity> {
  @ApiPropertyOptional({ type: DeliveryEntity })
  data?: DeliveryEntity; // 결과 데이터
}
export class DeliveryUpdateResponse extends UpdateResponse<DeliveryEntity> {
  @ApiPropertyOptional({ type: DeliveryEntity })
  data?: DeliveryEntity; // 결과 데이터
}
export class DeliveryDeleteResponse extends DeleteResponse<DeliveryEntity> {
  @ApiPropertyOptional({ type: DeliveryEntity })
  data?: DeliveryEntity; // 결과 데이터
}
