import { readdir } from 'fs-extra'
import * as inquirer from 'inquirer'

import { TEMPLATES } from '../paths'

export interface IBasicPromptResults extends Object {
  projectCustomTemplate: string
  projectName: string
  projectPort: string
  projectRepo: string
  projectScripts: string
  projectTemplate: string
  projectUseHTTPS: boolean
  projectVersion: string
}

export default async (projectName: string): Promise<inquirer.Questions> => {
  const rawTemplates = await readdir(TEMPLATES)
  const templates: any[] = []

  rawTemplates.forEach((template) => {
    templates.push({
      name: template,
      value: template
    })
  })

  return [
    {
      default: projectName,
      message: 'Project name:',
      name: 'projectName',
      type: 'input',
      validate: (input: string): boolean => {
        return !(input === '')
      }
    },
    {
      default: false,
      message: 'Do you want to use a custom template?',
      name: 'projectCustomTemplate',
      type: 'confirm'
    },
    {
      choices: templates,
      message: 'Pick a template to get started:',
      name: 'projectTemplate',
      type: 'list',
      when: (answers: IBasicPromptResults) => !answers.projectCustomTemplate
    },
    {
      choices: templates,
      message: `Input the npm published template package name:`,
      name: 'projectTemplate',
      type: 'input',
      when: (answers: IBasicPromptResults) => answers.projectCustomTemplate
    },
    {
      default: '3040',
      message: 'Which port do you want to run your pod on?',
      name: 'projectPort',
      type: 'input'
    },
    {
      default: '0.1.0',
      message: 'Where do you want to start your projects version at?',
      name: 'projectVersion',
      type: 'input'
    },
    {
      default: false,
      message: 'Do you want to use HTTPS for development?',
      name: 'projectUseHTTPS',
      type: 'confirm'
    },
    {
      default: '',
      message: `What's your projects repo URL?`,
      name: 'projectRepo',
      type: 'input'
    }
  ]
}
