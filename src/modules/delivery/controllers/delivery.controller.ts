// Nestjs
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

// Constants
import { ApiTag } from '../../../constants/api-tag';
import { ApiPath } from '../../../constants/api-path';
import { RoleType } from '../../../constants';

// Decorators
import { Auth, AuthUser } from '../../../decorators';
import { ApiListResponse } from '../../../decorators/api-list-response.decorator';

// Entity
import { DeliveryEntity } from '../entities/delivery.entity';

// Services
import { DeliveryService } from '../services/delivery.service';

// Response
import {
  DeliveryCreateResponse,
  DeliveryListResponse,
  DeliveryRetrieveResponse,
} from '../responses/delivery.response';

// Dto
import { CreateDeliveryDto } from '../dtos/create-delivery.dto';

// Main section
@Controller(ApiPath.API + 'deliveries')
@ApiTags(ApiTag.DELIVERY)
export class DeliveryController {
  constructor(private deliveryService: DeliveryService) {}

  @Post()
  @Auth([RoleType.USER])
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
    // Create delivery
    const deliveryCreated: DeliveryEntity = await this.deliveryService.create({
      user: user,
      ...createDeliveryDto,
    });

    // Get delivery
    const delivery: DeliveryEntity = await this.deliveryService.findOneOrFail(
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

  @Get()
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '배송 리스트 조회 API',
    description: '배송 리스트를 조회하는 API 입니다.',
  })
  @ApiListResponse(DeliveryEntity, { description: '배송 리스트 조회 성공시 결과 예시' })
  async getDelivery(@AuthUser() user) {
    // Get deliveries
    const deliveries: DeliveryEntity[] = await this.deliveryService.find({
      where: { user: user },
      relations: ['deliveryHistories'],
    });
    console.log(deliveries);

    // Return Delivery
    return new DeliveryListResponse(deliveries);
  }

  @Get(':id')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '배송 상세 조회 API',
    description: '배송 상세 조회하는 API 입니다.',
  })
  @ApiOkResponse({
    description: '배송 상세 조회 성공시 결과 예시',
    type: DeliveryRetrieveResponse,
  })
  async getOneDelivery(@AuthUser() user, @Param('id') id: Uuid) {
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

  @Get(':id/template')
  @Auth([RoleType.USER])
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
