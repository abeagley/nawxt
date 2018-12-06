import { getEnv } from '@nawxt/utils'
import { get as getAppDir } from 'app-root-dir'
import chalk from 'chalk'
import { join as pathJoin } from 'path'

const appDir = getAppDir()
require('dotenv').config({ path: pathJoin(appDir, 'config', 'env', getEnv()) })

import { commands as getProgramCommands } from './commands'

const major = parseInt(process.versions.node.split('.')[0], 10)

if (major < 8) {
  console.error(chalk.red(`You are running a version of Node below the current LTS version (8.x). Please upgrade.`))
  process.exit(1)
}

const main = async (args: string[]) => {
  const program = await getProgramCommands()

  if (!args.slice(2).length) {
    program.outputHelp()
    process.exit(1)
  }

  program.parse(args)
}

main(process.argv)
  .catch((e) => {
    console.error(chalk.red(e.message))
    process.exit(1)
  })
