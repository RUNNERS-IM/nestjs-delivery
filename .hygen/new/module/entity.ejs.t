---
to: "src/modules/<%= h.name(name) %>/entities/<%= h.entityFileName(name) %>.ts"
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
  createDtoFileName = h.createDtoFileName(name);
  UpdateDtoName = h.UpdateDtoName(name);
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

  // Response
  resourceName = h.resourceName(name);
  resourceFileName = h.resourceFileName(name);

  // Resource Options
  resourceOptionsName = h.resourceOptionsName(name);
  resourceOptionsFileName = h.resourceOptionsFileName(name);
%>// Nestjs
import { ApiProperty } from '@nestjs/swagger';
// Typeorm
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
// Third party
import { Exclude, Type } from 'class-transformer';
import { IsInt, IsPositive, IsString, IsUUID, Max, Min, ValidateNested } from 'class-validator';
// Constants
import { sampleUuid } from '../../../constants/sample';
// Entity
import { AbstractEntity } from '../../../common/abstract.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { <%= SubEntityName %> } from './<%= subEntityFileName %>';
// Main section
@Entity({ name: '<%= pluralName %>' })
export class <%= EntityName %> extends AbstractEntity {
  // ManyToOne fields
  @Type(() => UserEntity)
  @ValidateNested()
  @ManyToOne(() => UserEntity, (user) => user.<%= pluralName %>)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
  @Type()
  @ApiProperty({ type: 'string', description: '유저의 uuid', default: sampleUuid })
  @IsUUID()
  @Column({ nullable: false })
  userId: Uuid;

  // OneToMany fields
  @Type(() => <%= SubEntityName %>)
  @ValidateNested({ each: true })
  @OneToMany(() => <%= SubEntityName %>, (<%= subname %>) => <%= subname %>.<%= name %>)
  <%= subPluralName %>: <%= SubEntityName %>[];

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
