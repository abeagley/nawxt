import chalk from 'chalk'
import { copy, emptyDir, ensureDir, pathExists } from 'fs-extra'
import npmsearch from 'libnpmsearch'
import { EOL } from 'os'
import { join as pathJoin, resolve as pathResolve } from 'path'

import prompt from '../prompter'
import basicPrompts, { IBasicPromptResults } from '../prompts/basic'
import dirExistsPrompt from '../prompts/dir-exists'

import { exitWithLog, walkDir } from '@nawxt/utils'
import { compileTemplateFile } from '../handlebars'
import { RELATIVE_NAWXT_TEMPLATE_PROMPT, TEMPLATES } from '../paths'

const pkg = require('../package.json')

export const dirExists = async (projectName: string, targetDir: string): Promise<void> => {
  const exists = await pathExists(targetDir)

  if (!exists) {
    return
  }

  console.warn(chalk.yellow(`The project '${projectName}' already exists.`))
  const overwriteResult = await prompt(dirExistsPrompt())

  if (!overwriteResult.overwrite) {
    exitWithLog(`Project generation canceled. Will not overwrite existing directory.`)
  }

  await emptyDir(targetDir)
}

export const copySkeleton = async (targetDir: string, template: string): Promise<void> => {
  try {
    console.info(chalk.cyan(`Copying template skeleton to directory.`))
    await copy(pathJoin(TEMPLATES, template), targetDir)
  } catch (e) {
    exitWithLog(e.message)
  }
}

export const processSkeleton = async (targetDir: string, answers: IBasicPromptResults): Promise<void> => {
  const PATH = pathJoin(targetDir, RELATIVE_NAWXT_TEMPLATE_PROMPT)
  const hasTemplatePrompts = await pathExists(PATH)

  if (!hasTemplatePrompts) {
    return
  }

  console.info(chalk.cyan(`Grabbing template specific prompts.`))

  const templatePromptQuestions = require(PATH)

  let promptAnswers: any = null

  try {
    promptAnswers = await (prompt(templatePromptQuestions) as Promise<IBasicPromptResults>)
  } catch (e) {
    exitWithLog('Unable to process template prompt questions')
  }

  const promptResults = {
    ...promptAnswers,
    ...answers
  }

  console.info(chalk.cyan(`Compiling template specific files.`))

  try {
    const files = await walkDir(targetDir, (item: { path: string }) => {
      const pieces: string[] = item.path.split('.')
      return (pieces[pieces.length - 1] === 'hbs')
    })

    files.forEach((file) => compileTemplateFile(file, promptResults))
  } catch (e) {
    exitWithLog('Unable to walk project directory to compile template files')
  }
}

export const ensureServerPackage = async (template: string): Promise<string> => {
  console.info(chalk.cyan(`Checking for matching server package for template.`))

  let items: any[] = []
  try {
    items = await npmsearch(`@nawxt/server-${template}`, { limit: 1 })
  } catch (e) {
    exitWithLog('Unable to query for server package for the selected template')
  }

  if (items.length === 0) {
    exitWithLog(`No results for server template: @nawxt/server-${template}. Aborting.`)
  }

  const sPkg = items.shift()

  return `"${sPkg.name}": "^${sPkg.version}"`
}

export const create = async (projectName: string): Promise<boolean> => {
  let promptAnswers: null | IBasicPromptResults = null

  try {
    const promptQuestions = await basicPrompts(projectName)
    promptAnswers = await (prompt(promptQuestions) as Promise<IBasicPromptResults>)
  } catch (e) {
    exitWithLog('Unable to process prompt questions')
  }

  if (!promptAnswers) {
    return exitWithLog(`Unable to continue without all prompt answers`)
  }

  promptAnswers.projectServer = await ensureServerPackage(promptAnswers.projectTemplate)
  promptAnswers.scriptsVersion = pkg.dependencies['@nawxt/scripts']

  const targetDir = pathResolve(projectName || '.')

  await dirExists(projectName, targetDir)
  await ensureDir(targetDir)
  await copySkeleton(targetDir, promptAnswers.projectTemplate)
  await processSkeleton(targetDir, promptAnswers)

  const success = chalk.green(`${EOL}Project creation successful!${EOL}${EOL}`)
  const pemInfo = promptAnswers.projectUseHTTPS ? chalk.cyan(`To use a custom ssl cert for development, place one here: ${projectName}/.nawxt/config/server.pem${EOL}${EOL}`) : ''
  const install = chalk.yellow(`To complete installation:${EOL}\tcd ${projectName} && yarn install${EOL}`)

  console.info(success.concat(pemInfo).concat(install))

  return true
}
