---
to: "src/modules/<%= h.name(name) %>/controllers/<%= h.controllerFileName(name) %>.ts"
unless_exists: true
---
<%
  // Class
  ClassName = h.ClassName(name);

  // Name
  NAME = h.NAME(name);
  SUBNAME = h.SUBNAME(subname);

  // Plural
  pluralName = h.pluralName(name);
  subPluralName = h.subPluralName(subname);

  // Module
  moduleName = h.moduleName(name);
  ModuleName = h.ModuleName(name);
  moduleFileName = h.moduleFileName(name);

  // Service
  ServiceName = h.ServiceName(name);
  serviceName = h.serviceName(name);
  serviceFileName = h.serviceFileName(name);

  SubServiceName = h.SubServiceName(subname);
  subServiceFileName = h.subServiceFileName(subname);

  // Dto
  DtoName = h.DtoName(name);
  dtoFileName = h.dtoFileName(name);

  CreateDtoName = h.CreateDtoName(name);
  createDtoName = h.createDtoName(name);
  createDtoFileName = h.createDtoFileName(name);

  UpdateDtoName = h.UpdateDtoName(name);
  updateDtoName = h.updateDtoName(name);
  updateDtoFileName = h.updateDtoFileName(name);

  // Entity
  EntityName = h.EntityName(name);
  entityFileName = h.entityFileName(name);

  SubEntityName = h.SubEntityName(subname);
  subEntityFileName = h.subEntityFileName(subname);

  // Repository
  RepositoryName = h.RepositoryName(name);
  repositoryName = h.repositoryName(name);
  repositoryFileName = h.repositoryFileName(name);

  SubRepositoryName = h.SubRepositoryName(subname);
  subRepositoryName = h.subRepositoryName(subname);
  subRepositoryFileName = h.subRepositoryFileName(subname);

  // Subscriber
  SubscriberName = h.SubscriberName(name);
  subscriberFileName = h.subscriberFileName(name);

  SubSubscriberName = h.SubSubscriberName(subname);
  subSubscriberFileName = h.subSubscriberFileName(subname);

  // Controller
  ControllerName = h.ControllerName(name);
  controllerFileName = h.controllerFileName(name);

  SubControllerName = h.SubControllerName(subname);
  subControllerFileName = h.subControllerFileName(subname);

  // Response
  responseFileName = h.responseFileName(name);

  subResponseFileName = h.subResponseFileName(subname);

  // Resource
  resourceName = h.resourceName(name);
  resourceFileName = h.resourceFileName(name);
  resourceOptionsName = h.resourceOptionsName(name);
  resourceOptionsFileName = h.resourceOptionsFileName(name);

  subResourceName = h.subResourceName(subname);
  subResourceFileName = h.subResourceFileName(subname);
  subResourceOptionsName = h.subResourceOptionsName(subname);
  subResourceOptionsFileName = h.subResourceOptionsFileName(subname);

  // Function
  createFunctionName = 'create' + ClassName;
  updateFunctionName = 'update' + ClassName;
  partialUpdateFunctionName = 'partialUpdate' + ClassName;
  deleteFunctionName = 'delete' + ClassName;
  getAllFunctionName = 'get' + ClassName;
  getOneFunctionName = 'getOne' + ClassName;
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
