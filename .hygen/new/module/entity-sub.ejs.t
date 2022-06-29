---
to: "src/modules/<%= h.filename(name) %>/entities/<%= h.entityFileName(subname) %>.ts"
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
import { ApiProperty } from '@nestjs/swagger';

// Typeorm
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

// Third party
import { Exclude, Type } from 'class-transformer';
import { IsInt, IsPositive, IsString, IsUUID, Max, Min, ValidateNested } from 'class-validator';

// Constants
import { sampleUuid } from '../../../constants/sample';

// Entity
import { AbstractEntity } from '../../../common/abstract.entity';
import { <%= EntityName %> } from './<%= entityFileName %>';

// Main section
@Entity({ name: '<%= subPluralName %>' })
export class <%= SubEntityName %> extends AbstractEntity {
  // ManyToOne fields
  @Type(() => <%= EntityName %>)
  @ValidateNested()
  @ManyToOne(() => <%= EntityName %>, (<%= name %>) => <%= name %>.<%= subPluralName %>)
  @JoinColumn({ name: 'userId' })
  <%= name %>: <%= EntityName %>;

  @Type()
  @ApiProperty({ type: 'string', description: '<%= name %>의 id', default: sampleUuid })
  @IsUUID()
  @Column({ nullable: false })
  <%= name %>Id: Uuid;

  // Basic fields
  @ApiProperty({ type: 'string', description: '제목' })
  @IsString()
  @Column({ nullable: true })
  title: string;

  @ApiProperty({ type: 'number', description: '숫자', default: 0 })
  @Exclude({ toPlainOnly: true })
  @IsInt()
  @IsPositive()
  @Min(1)
  @Max(10)
  @Column({ nullable: false })
  number: number;
}
