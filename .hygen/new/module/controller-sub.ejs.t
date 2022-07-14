---
to: "src/modules/<%= h.filename(name) %>/controllers/<%= h.controllerFileName(subname) %>.ts"
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

  // Query
  QueryName = h.QueryName(name);
  SubQueryName = h.QueryName(subname);
  queryFileName = h.queryFileName(name);
  subQueryFileName = h.queryFileName(subname);

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
import { <%= SubEntityName %> } from '../entities/<%= subEntityFileName %>';
import { UserEntity } from "../../user/entities/user.entity";

// Services
import { <%= SubClassName %>Service } from '../services/<%= subServiceFileName %>';

// Response
import {
  <%= SubClassName %>CreateResponse,
  <%= SubClassName %>DeleteResponse,
  <%= SubClassName %>ListResponse,
  <%= SubClassName %>RetrieveResponse,
  <%= SubClassName %>UpdateResponse,
} from '../responses/<%= subResponseFileName %>';

// Dto
import { <%= SubCreateDtoName %> } from '../dtos/<%= subCreateDtoFileName %>';

// Main section
@Controller(ApiPath.API + '<%= subPluralName %>')
@ApiTags(ApiTag.<%= SUBNAME %>)
export class <%= SubClassName %>Controller {
  constructor(private <%= subServiceName %>: <%= SubClassName %>Service) {}

  @Post()
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '<%= sublabel %> 생성 API',
    description: '<%= sublabel %> 생성하는 API 입니다.',
  })
  @ApiOkResponse({
    description: '<%= sublabel %> 생성 성공시 결과 예시',
    type: <%= SubClassName %>CreateResponse,
  })
  async <%= subCreateFunctionName %>(@AuthUser() user, @Body() <%= subCreateDtoName %>: <%= SubCreateDtoName %>) {
    // Create <%= subname %>
    const <%= subname %>: <%= SubEntityName %> = await this.<%= subServiceName %>.create({ ...<%= subCreateDtoName %> });

    // Return <%= SubClassName %>
    return new <%= SubClassName %>CreateResponse(<%= subname %>);
  }

  @Get()
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '<%= sublabel %> 리스트 조회 API',
    description: '<%= sublabel %> 리스트를 조회하는 API 입니다.',
  })
  @ApiListResponse(<%= SubEntityName %>, { description: '<%= sublabel %> 리스트 조회 성공시 결과 예시' })
  async <%= subGetAllFunctionName %>(@AuthUser() user) {
    // Get <%= subPluralName %>
    const <%= subPluralName %>: <%= SubEntityName %>[] = await this.<%= subServiceName %>.find({});

    // Return <%= SubClassName %>
    return new <%= SubClassName %>ListResponse(<%= subPluralName %>);
  }

  @Get(':id')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '<%= sublabel %> 상세 조회 API',
    description: '<%= sublabel %> 상세 조회하는 API 입니다.',
  })
  @ApiOkResponse({
    description: '<%= sublabel %> 상세 조회 성공시 결과 예시',
    type: <%= SubClassName %>RetrieveResponse,
  })
  async <%= subGetOneFunctionName %>(@AuthUser() user, @Param('id') id: Uuid) {
    // Get <%= subname %>
    const <%= subname %>: <%= SubEntityName %> = await this.<%= subServiceName %>.findOneOrFail({
      id: id,
    });

    // Return <%= subname %>
    return new <%= SubClassName %>RetrieveResponse(<%= subname %>);
  }

  @Patch(':id')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '<%= sublabel %> 부분 수정 API',
    description: '<%= sublabel %> 부분 수정하는 API 입니다.',
  })
  @ApiOkResponse({
    description: '<%= sublabel %> 부분 수정 성공시 결과 예시',
    type: <%= SubClassName %>UpdateResponse,
  })
  async <%= subPartialUpdateFunctionName %>(@AuthUser() user, @Param('id') id: Uuid, @Body() <%= subUpdateDtoName %>: <%= SubUpdateDtoName %>) {
    // Update <%= subname %>
    const <%= subname %>: <%= SubEntityName %> = await this.<%= subServiceName %>.findOneOrFail({
      id: id,
    });

    // Return <%= subname %>
    return new <%= SubClassName %>UpdateResponse(<%= subname %>);
  }

  @Put(':id')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '<%= sublabel %> 전체 수정 API',
    description: '<%= sublabel %> 전체 수정하는 API 입니다.',
  })
  @ApiOkResponse({
    description: '<%= sublabel %> 전체 수정 성공시 결과 예시',
    type: <%= SubClassName %>UpdateResponse,
  })
  async <%= subUpdateFunctionName %>(@AuthUser() user, @Param('id') id: Uuid, @Body() <%= subUpdateDtoName %>: <%= SubUpdateDtoName %>) {
    // Update <%= subname %>
    const <%= subname %>: <%= SubEntityName %> = await this.<%= subServiceName %>.findOneOrFail({
      id: id,
    });

    // Return <%= subname %>
    return new <%= SubClassName %>UpdateResponse(<%= subname %>);
  }

  @Delete(':id')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '<%= sublabel %> 삭제 API',
    description: '<%= sublabel %> 삭제하는 API 입니다.',
  })
  @ApiOkResponse({
    description: '<%= sublabel %> 삭제 성공시 결과 예시',
    type: <%= SubClassName %>DeleteResponse,
  })
  async <%= subDeleteFunctionName %>(@AuthUser() user: UserEntity, @Param('id') id: Uuid) {
    // Delete <%= subname %>
    const <%= subname %>: <%= SubEntityName %> = await this.<%= subServiceName %>.findOneOrFail({
      id: id,
    });
    await this.<%= subServiceName %>.delete(id);

    // Return <%= subname %>
    return new <%= SubClassName %>DeleteResponse(<%= subname %>);
  }
}
