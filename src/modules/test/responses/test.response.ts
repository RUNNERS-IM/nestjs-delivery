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
import { TestEntity } from '../entities/test.entity';
// Main section
export class TestCreateResponse extends CreateResponse<TestEntity> {
  @ApiPropertyOptional({ type: TestEntity })
  data?: TestEntity; // 결과 데이터
}
export class TestListResponse extends ListResponse<TestEntity> {
  @ApiPropertyOptional({ type: [TestEntity], isArray: true })
  data?: TestEntity[]; // 결과 데이터
}
export class TestRetrieveResponse extends RetrieveResponse<TestEntity> {
  @ApiPropertyOptional({ type: TestEntity })
  data?: TestEntity; // 결과 데이터
}
export class TestUpdateResponse extends UpdateResponse<TestEntity> {
  @ApiPropertyOptional({ type: TestEntity })
  data?: TestEntity; // 결과 데이터
}
export class TestDeleteResponse extends DeleteResponse<TestEntity> {
  @ApiPropertyOptional({ type: TestEntity })
  data?: TestEntity; // 결과 데이터
}
