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
import { CEntity } from '../entities/c.entity';
import { UserEntity } from "../../user/entities/user.entity";

// Services
import { CService } from '../services/c.service';

// Response
import {
  CCreateResponse,
  CDeleteResponse,
  CListResponse,
  CRetrieveResponse,
  CUpdateResponse,
} from '../responses/c.response';

// Dto
import { CreateCDto } from '../dtos/create-c.dto';

// Main section
@Controller(ApiPath.API + 'cs')
@ApiTags(ApiTag.C)
export class CController {
  constructor(private cService: CService) {}

  @Post()
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'c 생성 API',
    description: 'c 생성하는 API 입니다.',
  })
  @ApiOkResponse({
    description: 'c 생성 성공시 결과 예시',
    type: CCreateResponse,
  })
  async createC(@AuthUser() user, @Body() createCDto: CreateCDto) {
    // Create c
    const c: CEntity = await this.cService.create({ userId: user.id, ...createCDto });

    // Return C
    return new CCreateResponse(c);
  }

  @Get()
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'c 리스트 조회 API',
    description: 'c 리스트를 조회하는 API 입니다.',
  })
  @ApiListResponse(CEntity, { description: 'c 리스트 조회 성공시 결과 예시' })
  async getC(@AuthUser() user) {
    // Get cs
    const cs: CEntity[] = await this.cService.find({ userId: user.id });

    // Return C
    return new CListResponse(cs);
  }

  @Get(':id')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'c 상세 조회 API',
    description: 'c 상세 조회하는 API 입니다.',
  })
  @ApiOkResponse({
    description: 'c 상세 조회 성공시 결과 예시',
    type: CRetrieveResponse,
  })
  async getOneC(@AuthUser() user, @Param('id') id: Uuid) {
    // Get c
    const c: CEntity = await this.cService.findOneOrFail({
      userId: user.id,
      id: id,
    });

    // Return c
    return new CRetrieveResponse(c);
  }

  @Patch(':id')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'c 부분 수정 API',
    description: 'c 부분 수정하는 API 입니다.',
  })
  @ApiOkResponse({
    description: 'c 부분 수정 성공시 결과 예시',
    type: CUpdateResponse,
  })
  async partialUpdateC(@AuthUser() user, @Param('id') id: Uuid) {
    // Update c
    const c: CEntity = await this.cService.findOneOrFail({
      userId: user.id,
      id: id,
    });

    // Return c
    return new CUpdateResponse(c);
  }

  @Put(':id')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'c 전체 수정 API',
    description: 'c 전체 수정하는 API 입니다.',
  })
  @ApiOkResponse({
    description: 'c 전체 수정 성공시 결과 예시',
    type: CUpdateResponse,
  })
  async updateC(@AuthUser() user, @Param('id') id: Uuid) {
    // Update c
    const c: CEntity = await this.cService.findOneOrFail({
      userId: user.id,
      id: id,
    });

    // Return c
    return new CUpdateResponse(c);
  }

  @Delete(':id')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'c 삭제 API',
    description: 'c 삭제하는 API 입니다.',
  })
  @ApiOkResponse({
    description: 'c 삭제 성공시 결과 예시',
    type: CDeleteResponse,
  })
  async deleteC(@AuthUser() user: UserEntity, @Param('id') id: Uuid) {
    // Delete c
    const c: CEntity = await this.cService.findOneOrFail({
      userId: user.id,
      id: id,
    });
    await this.cService.delete(id);

    // Return c
    return new CDeleteResponse(c);
  }
}
