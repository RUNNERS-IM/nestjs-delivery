module.exports = {
  templates: `${__dirname}/.hygen`,
  helpers: {
    // Class
    ClassName(name) {
      return this.changeCase.pascal(name);
    },

    // File
    name(name) {
      return this.inflection.dasherize(name).toLowerCase();
    },
    subname(subname) {
      return this.inflection.dasherize(subname).toLowerCase();
    },

    NAME(name) {
      return this.inflection.dasherize(name).toUpperCase();
    },
    SUBNAME(subname) {
      return this.inflection.dasherize(subname).toUpperCase();
    },

    // Plural
    pluralName(name) {
      return this.inflection.pluralize(this.inflection.dasherize(name)).toLowerCase();
    },
    subPluralName(subname) {
      return this.inflection.pluralize(this.inflection.dasherize(subname)).toLowerCase();
    },

    // Module
    moduleName(name) {
      return this.changeCase.camel(name);
    },
    ModuleName(name) {
      return `${this.ClassName(name)}Module`;
    },
    moduleFileName(name) {
      return `${this.name(name)}.module`;
    },

    // Service
    ServiceName(name) {
      return `${this.ClassName(name)}Service`;
    },
    serviceName(name) {
      return `${this.ClassName(name).toLowerCase()}Service`;
    },
    serviceFileName(name) {
      return `${this.name(name)}.service`;
    },

    SubServiceName(subname) {
      return `${this.ClassName(subname)}Service`;
    },
    subServiceName(subname) {
      return `${this.ClassName(subname).toLowerCase()}Service`;
    },
    subServiceFileName(subname) {
      return `${this.name(subname)}.service`;
    },

    // Dto
    DtoName(name) {
      return `${this.ClassName(name)}Dto`;
    },
    dtoFileName(name) {
      return `${this.name(name)}.dto`;
    },

    CreateDtoName(name) {
      return `Create${this.DtoName(name)}`;
    },
    createDtoName(name) {
      return `create${this.DtoName(name)}`;
    },
    createDtoFileName(name) {
      return `create-${this.name(name)}.dto`;
    },

    UpdateDtoName(name) {
      return `Update${this.DtoName(name)}`;
    },
    updateDtoName(name) {
      return `update${this.DtoName(name)}`;
    },
    updateDtoFileName(name) {
      return `update-${this.name(name)}.dto`;
    },

    SubDtoName(subname) {
      return `${this.ClassName(subname)}Dto`;
    },
    subDtoFileName(subname) {
      return `${this.name(subname)}.dto`;
    },

    SubCreateDtoName(subname) {
      return `Create${this.DtoName(subname)}`;
    },
    subCreateDtoName(subname) {
      return `create${this.DtoName(subname)}`;
    },
    subCreateDtoFileName(subname) {
      return `create-${this.name(subname)}.dto`;
    },

    SubUpdateDtoName(subname) {
      return `Update${this.DtoName(subname)}`;
    },
    subUpdateDtoName(subname) {
      return `update${this.DtoName(subname)}`;
    },
    subUpdateDtoFileName(subname) {
      return `update-${this.name(subname)}.dto`;
    },

    // Entity
    EntityName(name) {
      return `${this.ClassName(name)}Entity`;
    },
    entityFileName(name) {
      return `${this.name(name)}.entity`;
    },

    SubEntityName(subname) {
      return `${this.ClassName(subname)}Entity`;
    },
    subEntityFileName(subname) {
      return `${this.name(subname)}.entity`;
    },

    // Repository
    RepositoryName(name) {
      return `${this.ClassName(name)}Repository`;
    },
    repositoryName(name) {
      return `${this.ClassName(name).toLowerCase()}Repository`;
    },
    repositoryFileName(name) {
      return `${this.name(name)}.repository`;
    },

    SubRepositoryName(subname) {
      return `${this.ClassName(subname)}Repository`;
    },
    subRepositoryName(subname) {
      return `${this.ClassName(subname).toLowerCase()}Repository`;
    },
    subRepositoryFileName(subname) {
      return `${this.name(subname)}.repository`;
    },

    // Subscriber
    SubscriberName(name) {
      return `${this.ClassName(name)}Subscriber`;
    },
    subscriberFileName(name) {
      return `${this.name(name)}.subscriber`;
    },

    SubSubscriberName(subname) {
      return `${this.ClassName(subname)}Subscriber`;
    },
    subSubscriberFileName(subname) {
      return `${this.name(subname)}.subscriber`;
    },

    // Controller
    ControllerName(name) {
      return `${this.ClassName(name)}Controller`;
    },
    controllerFileName(name) {
      return `${this.name(name)}.controller`;
    },

    SubControllerName(subname) {
      return `${this.ClassName(subname)}Controller`;
    },
    subControllerFileName(subname) {
      return `${this.name(subname)}.controller`;
    },

    // Response
    responseFileName(name) {
      return `${this.name(name)}.response`;
    },

    subResponseFileName(subname) {
      return `${this.name(subname)}.response`;
    },

    // Resource
    resourceName(name) {
      return `${this.name(name)}Resource`;
    },
    resourceFileName(name) {
      return `${this.name(name)}.resource`;
    },
    resourceOptionsName(name) {
      return `${this.name(name)}ResourceOptions`;
    },
    resourceOptionsFileName(name) {
      return `${this.name(name)}.response.options`;
    },

    subResourceName(subname) {
      return `${this.name(subname)}Resource`;
    },
    subResourceFileName(subname) {
      return `${this.name(subname)}.resource`;
    },
    subResourceOptionsName(subname) {
      return `${this.name(subname)}ResourceOptions`;
    },
    subResourceOptionsFileName(subname) {
      return `${this.name(subname)}.response.options`;
    },
  },
};
