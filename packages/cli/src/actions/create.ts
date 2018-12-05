import chalk from 'chalk'
import { appendFile, copy, emptyDir, ensureDir, pathExists, readFile, writeJSON } from 'fs-extra'
import { EOL } from 'os'
import { join as pathJoin, resolve as pathResolve } from 'path'

import prompt from '../prompter'
import basicPrompts, { IBasicPromptResults } from '../prompts/basic'
import dirExistsPrompt from '../prompts/dir-exists'
import { exitWithLog } from '../utils/exit-with-log'

export const dirExists = async (projectName: string, targetDir: string): Promise<void> => {
  const exists = await pathExists(targetDir)

  if (!exists) {
    return
  }

  console.warn(chalk.yellow(`The pod/lib package '${projectName}' already exists.`))

  const overwriteResult = await prompt(dirExistsPrompt())

  if (!overwriteResult.overwrite) {
    exitWithLog(`Pod/lib generation canceled. Will not overwrite existing directory.`)
  }

  await emptyDir(targetDir)
}

export const copySkeleton = async (targetDir: string, template: string): Promise<void> => {
  try {
    console.info(chalk.cyan(`Copying skeleton to pod/lib directory.`))
    await copy(pathJoin(__dirname, '..', 'templates', template), targetDir)
  } catch (e) {
    exitWithLog(e.message)
  }
}

export const updateSkeletonPkg = async (
  projectName: string,
  targetDir: string,
  answers: IBasicPromptResults
): Promise<void> => {
  try {
    console.info(chalk.cyan(`Modifying template package.json with project details.`))
    const packageFile = pathJoin(targetDir, 'package.json')
    const skeletonPackage =
      await readFile(packageFile).then((data) => JSON.parse(data.toString()))

    await writeJSON(
      packageFile,
      {
        ...skeletonPackage,
        name: projectName,
        scripts: {
          ...skeletonPackage.scripts,
          docker: `nawxt-scripts docker ${answers.port}`
        },
        version: '0.1.0'
      },
      {
        spaces: 2
      }
    )
  } catch (e) {
    exitWithLog(e.message)
  }
}

export const writeConfig = async (targetDir: string, answers: IBasicPromptResults) => {
  console.info(chalk.cyan(`Writing environment configuration from generator to 'test.env'.`))
  const testFile = pathJoin(targetDir, 'config', 'env', 'test.env')
  const stageFile = pathJoin(targetDir, 'config', 'env', 'staging.env')
  const prodFile = pathJoin(targetDir, 'config', 'env', 'production.env')

  let env: string = `${EOL}`
  Object.keys(answers).forEach((key) => {
    // @ts-ignore
    env += `${key.toUpperCase()}="${answers[key]}"${EOL}`
  })
  await appendFile(testFile, env)
  await appendFile(stageFile, env)
  await appendFile(prodFile, env)
}

export const create = async (projectName: string): Promise<boolean> => {
  const results = await (prompt(basicPrompts(projectName)) as Promise<IBasicPromptResults>)

  const fullName = projectName
  const targetDir = pathResolve(fullName || '.')

  await dirExists(projectName, targetDir)
  await ensureDir(targetDir)
  await copySkeleton(targetDir, results.template)

  // If you want something in the applications environment file place it above this line
  await writeConfig(targetDir, results)

  // Ask for additional packages - DISABLED FOR NOW
  // const libResults = await (prompt(libPrompt(libs)) as Promise<ILibPromptResults>)
  await updateSkeletonPkg(fullName, targetDir, results)

  const success = chalk.green(`${EOL}Project creation successful!${EOL}${EOL}`)
  const pemInfo = chalk.cyan(`To use a custom ssl cert for development, place one here: ${fullName}/config/server.pem${EOL}${EOL}`)
  const install = chalk.yellow(`To complete installation:${EOL}\tcd ${fullName} && yarn install${EOL}`)

  console.info(success.concat(pemInfo).concat(install))
  process.chdir(targetDir)

  return true
}
