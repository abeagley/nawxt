import { getEnv } from '@nawxt/utils'
import chalk from 'chalk'
import { join as pathJoin } from 'path'

import { APP_NAWXT_ENV_DIR } from './paths'

require('dotenv').config({ path: pathJoin(APP_NAWXT_ENV_DIR, getEnv()) })

import { commands as getProgramCommands } from './commands'

const major = parseInt(process.versions.node.split('.')[0], 10)

if (major < 8) {
  console.error(chalk.red(`You are running a version of Node below 8.x - Please upgrade.`))
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
