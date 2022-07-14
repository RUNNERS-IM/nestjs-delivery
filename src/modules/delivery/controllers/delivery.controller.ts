// Nestjs
import {
  Body,
  CacheKey,
  CacheTTL,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

// Third party
import { Paginate } from 'nestjs-paginate';

// Constants
import { ApiTag } from '../../../constants/api-tag';
import { ApiPath } from '../../../constants/api-path';
import { RoleType } from '../../../constants';

// Decorators
import { Auth, AuthUser } from '../../../decorators';
import { PaginateApiQuery } from '../../../decorators/queries/paginate-query.decorator';

// Entity
import { DeliveryEntity } from '../entities/delivery.entity';

// Query
import { PaginationQuery } from '../../../common/queries/paginate.query';
import { DeliveryQuery } from '../queries/delivery.query';

// Services
import { DeliveryService } from '../services/delivery.service';

// Response
import { ApiPaginatedResponse } from '../../../decorators/responses/api-paginated-response.decorator';
import { ListPaginatedResponse } from '../../../constants/response';
import { DeliveryCreateResponse, DeliveryRetrieveResponse } from '../responses/delivery.response';

// Dto
import { CreateDeliveryDto } from '../dtos/create-delivery.dto';

// Main section
@Controller(ApiPath.API + 'deliveries')
@ApiTags(ApiTag.DELIVERY)
export class DeliveryController {
  constructor(private deliveryService: DeliveryService) {}

  @Post()
  @Auth([RoleType.USER, RoleType.ADMIN])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '배송 생성 API',
    description: '배송 생성하는 API 입니다.',
  })
  @ApiOkResponse({
    description: '배송 생성 성공시 결과 예시',
    type: DeliveryCreateResponse,
  })
  async createDelivery(@AuthUser() user, @Body() createDeliveryDto: CreateDeliveryDto) {
    // Get delivery
    let delivery: DeliveryEntity = await this.deliveryService.findOne({
      user: user,
      ...createDeliveryDto,
    });
    if (delivery) return new DeliveryCreateResponse(delivery);

    // Create delivery
    const deliveryCreated: DeliveryEntity = await this.deliveryService.create({
      user: user,
      ...createDeliveryDto,
    });

    // Get delivery
    delivery = await this.deliveryService.findOneOrFail(
      {
        user: user,
        id: deliveryCreated.id,
      },
      {
        relations: ['deliveryHistories'],
      },
    );

    // Return Delivery
    return new DeliveryCreateResponse(delivery);
  }

  @CacheKey('getDeliveries')
  @CacheTTL(60) // 1 minutes
  @Get()
  @PaginateApiQuery()
  @ApiQuery({ name: 'filter.time', required: false, example: '$btw:2022-01-01,2023-01-01' })
  @Auth([RoleType.USER, RoleType.ADMIN])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '배송 리스트 조회 API',
    description: '배송 리스트를 조회하는 API 입니다.',
  })
  @ApiPaginatedResponse(DeliveryEntity, { description: '배송 리스트 조회 성공시 결과 예시' })
  async getDeliveries(
    @AuthUser() user,
    @Query() query: DeliveryQuery,
    @Paginate() paginationQuery: PaginationQuery,
  ) {
    // Get deliveries
    const deliveriesPaginated = await this.deliveryService.search(
      {
        where: { user: user },
        // relations: ['deliveryHistories'],
      },
      paginationQuery,
    );

    // Return Delivery
    return new ListPaginatedResponse<DeliveryEntity>(deliveriesPaginated);
  }

  @CacheKey('getOneDelivery')
  @CacheTTL(60 * 10) // 10 minutes
  @Get(':id')
  @Auth([RoleType.USER, RoleType.ADMIN])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '배송 상세 조회 API',
    description: '배송 상세 조회하는 API 입니다.',
  })
  @ApiOkResponse({
    description: '배송 상세 조회 성공시 결과 예시',
    type: DeliveryRetrieveResponse,
  })
  async getOneDelivery(@AuthUser() user, @Param('id') id: Uuid, @Query() query: DeliveryQuery) {
    console.log('[getDelivery] 호추울 됬따아!!!');

    const delivery: DeliveryEntity = await this.deliveryService.findOneOrFail(
      {
        user: user,
        id: id,
      },
      // Get delivery
      {
        relations: ['deliveryHistories'],
      },
    );

    // Return delivery
    return new DeliveryRetrieveResponse(delivery);
  }

  @CacheKey('getOneDeliveryHtml')
  @CacheTTL(60 * 10) // 10 minutes
  @Get(':id/template')
  @Auth([RoleType.USER, RoleType.ADMIN])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '배송 상세페이지 조회 API',
    description: '배송 상세페이지 조회하는 API 입니다.',
  })
  async getOneDeliveryHtml(@AuthUser() user, @Param('id') id: Uuid) {
    // Get delivery
    const url = await this.deliveryService.getTemplate({
      user: user,
      id: id,
    });
    return { message: '페이지 조회를 완료하였습니다', data: url };
  }
}
