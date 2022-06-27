// Nestjs
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
// Constants
import { ApiTag } from '../../../constants/api-tag';
import { ApiPath } from '../../../constants/api-path';
import { RoleType } from '../../../constants';
// Decorators
import { Auth, AuthUser } from '../../../decorators';
import { ApiListResponse } from '../../../decorators/api-list-response.decorator';
// Entity
import { TestEntity } from '../entities/test.entity';
import { UserEntity } from "../../user/entities/user.entity";
// Services
import { TestService } from '../services/test.service';
// Response
import {
  TestCreateResponse,
  TestDeleteResponse,
  TestListResponse,
  TestRetrieveResponse,
  TestUpdateResponse,
} from '../responses/test.response';
// Dto
import { CreateTestDto } from '../dtos/create-test.dto';
// Main section
@Controller(ApiPath.API + 'tests')
@ApiTags(ApiTag.TEST)
export class TestController {
  constructor(private testService: TestService) {}
  @Post()
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '테스트 생성 API',
    description: '테스트 생성하는 API 입니다.',
  })
  @ApiOkResponse({
    description: '테스트 생성 성공시 결과 예시',
    type: TestCreateResponse,
  })
  async createTest(@AuthUser() user, @Body() createTestDto: CreateTestDto) {
    // Create test
    const test: TestEntity = await this.testService.create({ userId: user.id, ...createTestDto });
    // Return Test
    return new TestCreateResponse(test);
  }
  @Get()
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '테스트 리스트 조회 API',
    description: '테스트 리스트를 조회하는 API 입니다.',
  })
  @ApiListResponse(TestEntity, { description: '테스트 리스트 조회 성공시 결과 예시' })
  async getTest(@AuthUser() user) {
    // Get tests
    const tests: TestEntity[] = await this.testService.find({ userId: user.id });
    // Return Test
    return new TestListResponse(tests);
  }
  @Get(':id')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '테스트 상세 조회 API',
    description: '테스트 상세 조회하는 API 입니다.',
  })
  @ApiOkResponse({
    description: '테스트 상세 조회 성공시 결과 예시',
    type: TestRetrieveResponse,
  })
  async getOneTest(@AuthUser() user, @Param('id') id: Uuid) {
    // Get test
    const test: TestEntity = await this.testService.findOneOrFail({
      userId: user.id,
      id: id,
    });
    // Return test
    return new TestRetrieveResponse(test);
  }
  @Patch(':id')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '테스트 부분 수정 API',
    description: '테스트 부분 수정하는 API 입니다.',
  })
  @ApiOkResponse({
    description: '테스트 부분 수정 성공시 결과 예시',
    type: TestUpdateResponse,
  })
  async partialUpdateTest(@AuthUser() user, @Param('id') id: Uuid) {
    // Update test
    const test: TestEntity = await this.testService.findOneOrFail({
      userId: user.id,
      id: id,
    });
    // Return test
    return new TestUpdateResponse(test);
  }
  @Put(':id')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '테스트 전체 수정 API',
    description: '테스트 전체 수정하는 API 입니다.',
  })
  @ApiOkResponse({
    description: '테스트 전체 수정 성공시 결과 예시',
    type: TestUpdateResponse,
  })
  async updateTest(@AuthUser() user, @Param('id') id: Uuid) {
    // Update test
    const test: TestEntity = await this.testService.findOneOrFail({
      userId: user.id,
      id: id,
    });
    // Return test
    return new TestUpdateResponse(test);
  }
  @Delete(':id')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '테스트 삭제 API',
    description: '테스트 삭제하는 API 입니다.',
  })
  @ApiOkResponse({
    description: '테스트 삭제 성공시 결과 예시',
    type: TestDeleteResponse,
  })
  async deleteTest(@AuthUser() user: UserEntity, @Param('id') id: Uuid) {
    // Delete test
    const test: TestEntity = await this.testService.findOneOrFail({
      userId: user.id,
      id: id,
    });
    await this.testService.delete(id);
    // Return test
    return new TestDeleteResponse(test);
  }
}
