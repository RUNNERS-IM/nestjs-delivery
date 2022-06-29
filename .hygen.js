module.exports = {
  templates: `${__dirname}/.hygen`,
  helpers: {
    // Class
    ClassName(name) {
      return this.changeCase.pascal(name);
    },

    // Name
    name(name) {
      return this.changeCase.camelCase(this.inflection.dasherize(name));
    },

    NAME(name) {
      return this.name(name).toUpperCase();
    },

    // Plural
    pluralName(name) {
      return this.changeCase.camel(this.inflection.pluralize(this.inflection.dasherize(name)));
    },

    // File
    filename(name) {
      return this.changeCase.paramCase(name);
    },

    // Module
    moduleName(name) {
      return this.changeCase.camel(name);
    },
    ModuleName(name) {
      return `${this.ClassName(name)}Module`;
    },
    moduleFileName(name) {
      return `${this.filename(name)}.module`;
    },

    // Service
    ServiceName(name) {
      return `${this.ClassName(name)}Service`;
    },
    serviceName(name) {
      return `${this.ClassName(name).toLowerCase()}Service`;
    },
    serviceFileName(name) {
      return `${this.filename(name)}.service`;
    },

    // Dto
    DtoName(name) {
      return `${this.ClassName(name)}Dto`;
    },
    dtoFileName(name) {
      return `${this.filename(name)}.dto`;
    },

    CreateDtoName(name) {
      return `Create${this.DtoName(name)}`;
    },
    createDtoName(name) {
      return `create${this.DtoName(name)}`;
    },
    createDtoFileName(name) {
      return `create-${this.filename(name)}.dto`;
    },

    UpdateDtoName(name) {
      return `Update${this.DtoName(name)}`;
    },
    updateDtoName(name) {
      return `update${this.DtoName(name)}`;
    },
    updateDtoFileName(name) {
      return `update-${this.filename(name)}.dto`;
    },

    SubDtoName(subname) {
      return `${this.ClassName(subname)}Dto`;
    },
    subDtoFileName(subname) {
      return `${this.filename(subname)}.dto`;
    },

    // Entity
    EntityName(name) {
      return `${this.ClassName(name)}Entity`;
    },
    entityFileName(name) {
      return `${this.filename(name)}.entity`;
    },

    // Repository
    RepositoryName(name) {
      return `${this.ClassName(name)}Repository`;
    },
    repositoryName(name) {
      return `${this.ClassName(name).toLowerCase()}Repository`;
    },
    repositoryFileName(name) {
      return `${this.filename(name)}.repository`;
    },

    // Subscriber
    SubscriberName(name) {
      return `${this.ClassName(name)}Subscriber`;
    },
    subscriberFileName(name) {
      return `${this.filename(name)}.subscriber`;
    },

    // Controller
    ControllerName(name) {
      return `${this.ClassName(name)}Controller`;
    },
    controllerFileName(name) {
      return `${this.filename(name)}.controller`;
    },

    // Response
    responseFileName(name) {
      return `${this.filename(name)}.response`;
    },

    // Resource
    resourceName(name) {
      return `${this.name(name)}Resource`;
    },
    resourceFileName(name) {
      return `${this.filename(name)}.resource`;
    },
    resourceOptionsName(name) {
      return `${this.name(name)}ResourceOptions`;
    },
    resourceOptionsFileName(name) {
      return `${this.filename(name)}.response.options`;
    },
  },
};
