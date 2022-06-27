'use strict';
const getInputPrompt = (title) => {
  return {
    type: 'input',
    name: title,
    message: title.toUpperCase() + ':',
    validate(value) {
      if (!value.length) {
        return 'Module must have a name.';
      }
      return true;
    },
  };
};

module.exports = {
  prompt: ({ prompter, args }) => {
    return prompter
      .prompt([
        getInputPrompt('name'),
        getInputPrompt('label'),
        getInputPrompt('subname'),
        getInputPrompt('sublabel'),
        {
          type: 'MultiSelect',
          name: 'blocks',
          message: 'Blocks:',
          initial: [
            'Controller',
            'Entity',
            'Repository',
            'Subrepository',
            'Service',
            // Dtos
            'DTO',
            'CreateDTO',
            'UpdateDTO',
          ],
          choices: [
            {
              name: 'Controller',
              value: 'controller',
            },
            {
              name: 'Entity',
              value: 'entity',
            },
            {
              name: 'Repository',
              value: 'repository',
            },
            {
              name: 'Subrepository',
              value: 'subrepository',
            },
            {
              name: 'Service',
              value: 'service',
            },
            // Dtos
            {
              name: 'DTO',
              value: 'dto',
            },
            {
              name: 'CreateDTO',
              value: 'create-dto',
            },
            {
              name: 'UpdateDTO',
              value: 'update-dto',
            },
          ],
        },
      ])
      .then((answer) => {
        //// For debugging
        // console.log(answer)
        return answer;
      });
  },
};
