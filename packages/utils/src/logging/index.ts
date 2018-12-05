import chalk from 'chalk'

export const exitWithLog = (err: string) => {
  console.error(chalk.red(err))
  process.exit(1)
}

export const announceCommand = (pkg: string, version: string, command: string) => {
  console.info(chalk.yellow(`@nawxt/${pkg}/${version} - Running '${command}'`))
}
