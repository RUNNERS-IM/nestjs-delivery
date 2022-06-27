---
to: "src/modules/<%= h.name(name) %>/entities/<%= h.subEntityFileName(subname) %>.ts"
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
  updateDtoFileName = h.updateDtoFileName(name);

  SubDtoName = h.SubDtoName(subname);
  subDtoFileName = h.subDtoFileName(subname);
  SubCreateDtoName = h.SubCreateDtoName(subname);
  subCreateDtoName = h.subCreateDtoName(subname);
  subCreateDtoFileName = h.subCreateDtoFileName(subname);
  SubUpdateDtoName = h.SubUpdateDtoName(subname);
  subUpdateDtoName = h.subUpdateDtoName(subname);
  subUpdateDtoFileName = h.subUpdateDtoFileName(subname);

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
%>// Nestjs
import { ApiProperty } from '@nestjs/swagger';

// Typeorm
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

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
  // OneToOne fields
  @Type(() => <%= EntityName %>)
  @ValidateNested()
  @OneToOne(() => <%= EntityName %>, (<%= name %>) => <%= name %>.<%= subPluralName %>)
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
