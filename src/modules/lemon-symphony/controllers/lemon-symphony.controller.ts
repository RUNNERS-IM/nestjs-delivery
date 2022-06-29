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
import { LemonSymphonyEntity } from '../entities/lemon-symphony.entity';
import { UserEntity } from "../../user/entities/user.entity";

// Services
import { LemonSymphonyService } from '../services/lemon-symphony.service';

// Response
import {
  LemonSymphonyCreateResponse,
  LemonSymphonyDeleteResponse,
  LemonSymphonyListResponse,
  LemonSymphonyRetrieveResponse,
  LemonSymphonyUpdateResponse,
} from '../responses/lemon-symphony.response';

// Dto
import { CreateLemonSymphonyDto } from '../dtos/create-lemon-symphony.dto';

// Main section
@Controller(ApiPath.API + 'lemonSymphonies')
@ApiTags(ApiTag.LEMONSYMPHONY)
export class LemonSymphonyController {
  constructor(private lemonsymphonyService: LemonSymphonyService) {}

  @Post()
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '1 생성 API',
    description: '1 생성하는 API 입니다.',
  })
  @ApiOkResponse({
    description: '1 생성 성공시 결과 예시',
    type: LemonSymphonyCreateResponse,
  })
  async createLemonSymphony(@AuthUser() user, @Body() createLemonSymphonyDto: CreateLemonSymphonyDto) {
    // Create lemonSymphony
    const lemonSymphony: LemonSymphonyEntity = await this.lemonsymphonyService.create({ userId: user.id, ...createLemonSymphonyDto });

    // Return LemonSymphony
    return new LemonSymphonyCreateResponse(lemonSymphony);
  }

  @Get()
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '1 리스트 조회 API',
    description: '1 리스트를 조회하는 API 입니다.',
  })
  @ApiListResponse(LemonSymphonyEntity, { description: '1 리스트 조회 성공시 결과 예시' })
  async getLemonSymphony(@AuthUser() user) {
    // Get lemonSymphonies
    const lemonSymphonies: LemonSymphonyEntity[] = await this.lemonsymphonyService.find({ userId: user.id });

    // Return LemonSymphony
    return new LemonSymphonyListResponse(lemonSymphonies);
  }

  @Get(':id')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '1 상세 조회 API',
    description: '1 상세 조회하는 API 입니다.',
  })
  @ApiOkResponse({
    description: '1 상세 조회 성공시 결과 예시',
    type: LemonSymphonyRetrieveResponse,
  })
  async getOneLemonSymphony(@AuthUser() user, @Param('id') id: Uuid) {
    // Get lemonSymphony
    const lemonSymphony: LemonSymphonyEntity = await this.lemonsymphonyService.findOneOrFail({
      userId: user.id,
      id: id,
    });

    // Return lemonSymphony
    return new LemonSymphonyRetrieveResponse(lemonSymphony);
  }

  @Patch(':id')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '1 부분 수정 API',
    description: '1 부분 수정하는 API 입니다.',
  })
  @ApiOkResponse({
    description: '1 부분 수정 성공시 결과 예시',
    type: LemonSymphonyUpdateResponse,
  })
  async partialUpdateLemonSymphony(@AuthUser() user, @Param('id') id: Uuid) {
    // Update lemonSymphony
    const lemonSymphony: LemonSymphonyEntity = await this.lemonsymphonyService.findOneOrFail({
      userId: user.id,
      id: id,
    });

    // Return lemonSymphony
    return new LemonSymphonyUpdateResponse(lemonSymphony);
  }

  @Put(':id')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '1 전체 수정 API',
    description: '1 전체 수정하는 API 입니다.',
  })
  @ApiOkResponse({
    description: '1 전체 수정 성공시 결과 예시',
    type: LemonSymphonyUpdateResponse,
  })
  async updateLemonSymphony(@AuthUser() user, @Param('id') id: Uuid) {
    // Update lemonSymphony
    const lemonSymphony: LemonSymphonyEntity = await this.lemonsymphonyService.findOneOrFail({
      userId: user.id,
      id: id,
    });

    // Return lemonSymphony
    return new LemonSymphonyUpdateResponse(lemonSymphony);
  }

  @Delete(':id')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '1 삭제 API',
    description: '1 삭제하는 API 입니다.',
  })
  @ApiOkResponse({
    description: '1 삭제 성공시 결과 예시',
    type: LemonSymphonyDeleteResponse,
  })
  async deleteLemonSymphony(@AuthUser() user: UserEntity, @Param('id') id: Uuid) {
    // Delete lemonSymphony
    const lemonSymphony: LemonSymphonyEntity = await this.lemonsymphonyService.findOneOrFail({
      userId: user.id,
      id: id,
    });
    await this.lemonsymphonyService.delete(id);

    // Return lemonSymphony
    return new LemonSymphonyDeleteResponse(lemonSymphony);
  }
}
