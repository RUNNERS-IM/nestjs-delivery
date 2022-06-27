---
to: "src/modules/<%= h.name(name) %>/repositories/<%= h.repositoryFileName(name) %>.ts"
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
%>// Typeorm
import { EntityRepository, Repository } from 'typeorm';

// Entity
import { <%= EntityName %> } from '../entities/<%= entityFileName %>';

// Main section
@EntityRepository(<%= EntityName %>)
export class <%= RepositoryName %> extends Repository<<%= EntityName %>> {}
