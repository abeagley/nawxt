import { readdir } from 'fs-extra'
import * as inquirer from 'inquirer'

import { TEMPLATES } from '../paths'

export interface IBasicPromptResults extends Object {
  port: string,
  projectName: string,
  template: string
}

export default async (projectName: string): inquirer.Questions => {
  const rawTemplates = await readdir(TEMPLATES)
  const templates: any[] = []

  rawTemplates.forEach((template) => {
    templates.push({
      name: template.replace(/-g/, ' '),
      value: template
    })
  })

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
      choices: templates,
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
