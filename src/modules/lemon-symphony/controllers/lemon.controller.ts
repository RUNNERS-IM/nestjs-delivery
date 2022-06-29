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
import { LemonEntity } from '../entities/lemon.entity';
import { UserEntity } from "../../user/entities/user.entity";

// Services
import { LemonService } from '../services/lemon.service';

// Response
import {
  LemonCreateResponse,
  LemonDeleteResponse,
  LemonListResponse,
  LemonRetrieveResponse,
  LemonUpdateResponse,
} from '../responses/lemon.response';

// Dto
import { CreateLemonDto } from '../dtos/create-lemon.dto';

// Main section
@Controller(ApiPath.API + 'lemons')
@ApiTags(ApiTag.LEMON)
export class LemonController {
  constructor(private lemonService: LemonService) {}

  @Post()
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '2 생성 API',
    description: '2 생성하는 API 입니다.',
  })
  @ApiOkResponse({
    description: '2 생성 성공시 결과 예시',
    type: LemonCreateResponse,
  })
  async createLemon(@AuthUser() user, @Body() createLemonDto: CreateLemonDto) {
    // Create lemon
    const lemon: LemonEntity = await this.lemonService.create({ ...createLemonDto });

    // Return Lemon
    return new LemonCreateResponse(lemon);
  }

  @Get()
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '2 리스트 조회 API',
    description: '2 리스트를 조회하는 API 입니다.',
  })
  @ApiListResponse(LemonEntity, { description: '2 리스트 조회 성공시 결과 예시' })
  async getLemon(@AuthUser() user) {
    // Get lemons
    const lemons: LemonEntity[] = await this.lemonService.find({});

    // Return Lemon
    return new LemonListResponse(lemons);
  }

  @Get(':id')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '2 상세 조회 API',
    description: '2 상세 조회하는 API 입니다.',
  })
  @ApiOkResponse({
    description: '2 상세 조회 성공시 결과 예시',
    type: LemonRetrieveResponse,
  })
  async getOneLemon(@AuthUser() user, @Param('id') id: Uuid) {
    // Get lemon
    const lemon: LemonEntity = await this.lemonService.findOneOrFail({
      id: id,
    });

    // Return lemon
    return new LemonRetrieveResponse(lemon);
  }

  @Patch(':id')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '2 부분 수정 API',
    description: '2 부분 수정하는 API 입니다.',
  })
  @ApiOkResponse({
    description: '2 부분 수정 성공시 결과 예시',
    type: LemonUpdateResponse,
  })
  async partialUpdateLemon(@AuthUser() user, @Param('id') id: Uuid) {
    // Update lemon
    const lemon: LemonEntity = await this.lemonService.findOneOrFail({
      id: id,
    });

    // Return lemon
    return new LemonUpdateResponse(lemon);
  }

  @Put(':id')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '2 전체 수정 API',
    description: '2 전체 수정하는 API 입니다.',
  })
  @ApiOkResponse({
    description: '2 전체 수정 성공시 결과 예시',
    type: LemonUpdateResponse,
  })
  async updateLemon(@AuthUser() user, @Param('id') id: Uuid) {
    // Update lemon
    const lemon: LemonEntity = await this.lemonService.findOneOrFail({
      id: id,
    });

    // Return lemon
    return new LemonUpdateResponse(lemon);
  }

  @Delete(':id')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '2 삭제 API',
    description: '2 삭제하는 API 입니다.',
  })
  @ApiOkResponse({
    description: '2 삭제 성공시 결과 예시',
    type: LemonDeleteResponse,
  })
  async deleteLemon(@AuthUser() user: UserEntity, @Param('id') id: Uuid) {
    // Delete lemon
    const lemon: LemonEntity = await this.lemonService.findOneOrFail({
      id: id,
    });
    await this.lemonService.delete(id);

    // Return lemon
    return new LemonDeleteResponse(lemon);
  }
}
