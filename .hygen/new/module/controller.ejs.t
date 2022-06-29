---
to: "src/modules/<%= h.filename(name) %>/controllers/<%= h.controllerFileName(name) %>.ts"
unless_exists: true
---
<%
  // Class
  ClassName = h.ClassName(name);
  SubClassName = h.ClassName(subname);

  // Name
  name = h.name(name);
  subname = h.name(subname);
  NAME = h.NAME(name);
  SUBNAME = h.NAME(subname);

  // Plural
  pluralName = h.pluralName(name);
  subPluralName = h.pluralName(subname);

  // Module
  moduleName = h.moduleName(name);
  ModuleName = h.ModuleName(name);
  moduleFileName = h.moduleFileName(name);

  // Service
  ServiceName = h.ServiceName(name);
  SubServiceName = h.ServiceName(subname);
  serviceName = h.serviceName(name);
  subServiceName = h.serviceName(subname);
  serviceFileName = h.serviceFileName(name);
  subServiceFileName = h.serviceFileName(subname);

  // Dto
  DtoName = h.DtoName(name);
  SubDtoName = h.DtoName(subname);
  dtoFileName = h.dtoFileName(name);
  subDtoFileName = h.dtoFileName(subname);

  // Create Dto
  CreateDtoName = h.CreateDtoName(name);
  SubCreateDtoName = h.CreateDtoName(subname);
  createDtoName = h.createDtoName(name);
  subCreateDtoName = h.createDtoName(subname);
  createDtoFileName = h.createDtoFileName(name);
  subCreateDtoFileName = h.createDtoFileName(subname);

  // Update Dto
  UpdateDtoName = h.UpdateDtoName(name);
  SubUpdateDtoName = h.UpdateDtoName(subname);
  updateDtoName = h.updateDtoName(name);
  subUpdateDtoName = h.updateDtoName(subname);
  updateDtoFileName = h.updateDtoFileName(name);
  subUpdateDtoFileName = h.updateDtoFileName(subname);

  // Entity
  EntityName = h.EntityName(name);
  SubEntityName = h.EntityName(subname);
  entityFileName = h.entityFileName(name);
  subEntityFileName = h.entityFileName(subname);

  // Repository
  RepositoryName = h.RepositoryName(name);
  SubRepositoryName = h.RepositoryName(subname);
  repositoryName = h.repositoryName(name);
  subRepositoryName = h.repositoryName(subname);
  repositoryFileName = h.repositoryFileName(name);
  subRepositoryFileName = h.repositoryFileName(subname);

  // Subscriber
  SubscriberName = h.SubscriberName(name);
  SubSubscriberName = h.SubscriberName(subname);
  subscriberFileName = h.subscriberFileName(name);
  subSubscriberFileName = h.subscriberFileName(subname);

  // Controller
  ControllerName = h.ControllerName(name);
  SubControllerName = h.ControllerName(subname);
  controllerFileName = h.controllerFileName(name);
  subControllerFileName = h.controllerFileName(subname);

  // Response
  responseFileName = h.responseFileName(name);
  subResponseFileName = h.responseFileName(subname);

  // Resource
  resourceName = h.resourceName(name);
  subResourceName = h.resourceName(subname);
  resourceFileName = h.resourceFileName(name);
  subResourceFileName = h.resourceFileName(subname);
  resourceOptionsName = h.resourceOptionsName(name);
  subResourceOptionsName = h.resourceOptionsName(subname);
  resourceOptionsFileName = h.resourceOptionsFileName(name);
  subResourceOptionsFileName = h.resourceOptionsFileName(subname);

  // Function
  createFunctionName = 'create' + ClassName;
  subCreateFunctionName = 'create' + SubClassName;

  updateFunctionName = 'update' + ClassName;
  subUpdateFunctionName = 'update' + SubClassName;

  partialUpdateFunctionName = 'partialUpdate' + ClassName;
  subPartialUpdateFunctionName = 'partialUpdate' + SubClassName;

  deleteFunctionName = 'delete' + ClassName;
  subDeleteFunctionName = 'delete' + SubClassName;

  getAllFunctionName = 'get' + ClassName;
  subGetAllFunctionName = 'get' + SubClassName;

  getOneFunctionName = 'getOne' + ClassName;
  subGetOneFunctionName = 'getOne' + SubClassName;
%>// Nestjs
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
import { <%= EntityName %> } from '../entities/<%= entityFileName %>';
import { UserEntity } from "../../user/entities/user.entity";

// Services
import { <%= ClassName %>Service } from '../services/<%= serviceFileName %>';

// Response
import {
  <%= ClassName %>CreateResponse,
  <%= ClassName %>DeleteResponse,
  <%= ClassName %>ListResponse,
  <%= ClassName %>RetrieveResponse,
  <%= ClassName %>UpdateResponse,
} from '../responses/<%= responseFileName %>';

// Dto
import { <%= CreateDtoName %> } from '../dtos/<%= createDtoFileName %>';

// Main section
@Controller(ApiPath.API + '<%= pluralName %>')
@ApiTags(ApiTag.<%= NAME %>)
export class <%= ClassName %>Controller {
  constructor(private <%= serviceName %>: <%= ClassName %>Service) {}

  @Post()
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '<%= label %> 생성 API',
    description: '<%= label %> 생성하는 API 입니다.',
  })
  @ApiOkResponse({
    description: '<%= label %> 생성 성공시 결과 예시',
    type: <%= ClassName %>CreateResponse,
  })
  async <%= createFunctionName %>(@AuthUser() user, @Body() <%= createDtoName %>: <%= CreateDtoName %>) {
    // Create <%= name %>
    const <%= name %>: <%= EntityName %> = await this.<%= serviceName %>.create({ userId: user.id, ...<%= createDtoName %> });

    // Return <%= ClassName %>
    return new <%= ClassName %>CreateResponse(<%= name %>);
  }

  @Get()
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '<%= label %> 리스트 조회 API',
    description: '<%= label %> 리스트를 조회하는 API 입니다.',
  })
  @ApiListResponse(<%= EntityName %>, { description: '<%= label %> 리스트 조회 성공시 결과 예시' })
  async <%= getAllFunctionName %>(@AuthUser() user) {
    // Get <%= pluralName %>
    const <%= pluralName %>: <%= EntityName %>[] = await this.<%= serviceName %>.find({ userId: user.id });

    // Return <%= ClassName %>
    return new <%= ClassName %>ListResponse(<%= pluralName %>);
  }

  @Get(':id')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '<%= label %> 상세 조회 API',
    description: '<%= label %> 상세 조회하는 API 입니다.',
  })
  @ApiOkResponse({
    description: '<%= label %> 상세 조회 성공시 결과 예시',
    type: <%= ClassName %>RetrieveResponse,
  })
  async <%= getOneFunctionName %>(@AuthUser() user, @Param('id') id: Uuid) {
    // Get <%= name %>
    const <%= name %>: <%= EntityName %> = await this.<%= serviceName %>.findOneOrFail({
      userId: user.id,
      id: id,
    });

    // Return <%= name %>
    return new <%= ClassName %>RetrieveResponse(<%= name %>);
  }

  @Patch(':id')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '<%= label %> 부분 수정 API',
    description: '<%= label %> 부분 수정하는 API 입니다.',
  })
  @ApiOkResponse({
    description: '<%= label %> 부분 수정 성공시 결과 예시',
    type: <%= ClassName %>UpdateResponse,
  })
  async <%= partialUpdateFunctionName %>(@AuthUser() user, @Param('id') id: Uuid) {
    // Update <%= name %>
    const <%= name %>: <%= EntityName %> = await this.<%= serviceName %>.findOneOrFail({
      userId: user.id,
      id: id,
    });

    // Return <%= name %>
    return new <%= ClassName %>UpdateResponse(<%= name %>);
  }

  @Put(':id')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '<%= label %> 전체 수정 API',
    description: '<%= label %> 전체 수정하는 API 입니다.',
  })
  @ApiOkResponse({
    description: '<%= label %> 전체 수정 성공시 결과 예시',
    type: <%= ClassName %>UpdateResponse,
  })
  async <%= updateFunctionName %>(@AuthUser() user, @Param('id') id: Uuid) {
    // Update <%= name %>
    const <%= name %>: <%= EntityName %> = await this.<%= serviceName %>.findOneOrFail({
      userId: user.id,
      id: id,
    });

    // Return <%= name %>
    return new <%= ClassName %>UpdateResponse(<%= name %>);
  }

  @Delete(':id')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '<%= label %> 삭제 API',
    description: '<%= label %> 삭제하는 API 입니다.',
  })
  @ApiOkResponse({
    description: '<%= label %> 삭제 성공시 결과 예시',
    type: <%= ClassName %>DeleteResponse,
  })
  async <%= deleteFunctionName %>(@AuthUser() user: UserEntity, @Param('id') id: Uuid) {
    // Delete <%= name %>
    const <%= name %>: <%= EntityName %> = await this.<%= serviceName %>.findOneOrFail({
      userId: user.id,
      id: id,
    });
    await this.<%= serviceName %>.delete(id);

    // Return <%= name %>
    return new <%= ClassName %>DeleteResponse(<%= name %>);
  }
}
