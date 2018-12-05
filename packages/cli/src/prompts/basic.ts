import * as inquirer from 'inquirer'

export interface IBasicPromptResults extends Object {
  port: string,
  projectName: string,
  template: string
}

export default (projectName: string): inquirer.Questions => {
  return [
    {
      default: projectName,
      message: 'Pod/Library Name:',
      name: 'projectName',
      type: 'input',
      validate: (input: string): boolean => {
        return !(input === '')
      }
    },
    {
      choices: [
        {
          name: 'Next7 TS React',
          value: 'ts-next-7'
        }
      ],
      message: 'Pick a template to get started:',
      name: 'template',
      type: 'list'
    },
    {
      default: '3040',
      message: 'Which port do you want to run your pod on?',
      name: 'port',
      type: 'input'
    }
  ]
}
