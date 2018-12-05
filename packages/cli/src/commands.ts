import * as commander from 'commander'
import { readFile } from 'fs-extra'
import { join as pathJoin } from 'path'

import { create } from './actions/create'
import { announceCommand } from '@nawxt/utils'

export const commands = async (): Promise<any> => {
  const packageFile =
    await readFile(pathJoin(__dirname, '..', 'package.json'))
      .then((data) => JSON.parse(data.toString()))
  const program = commander.name(packageFile.name).version(packageFile.version)

  const cmdAnnouncement = (command: string) => announceCommand('cli', packageFile.version, command)

  program
    .command('create <app-name>')
    .description('create a new Nawxt project')
    .action(async (name, _cmd) => { cmdAnnouncement('create'); await create(name) })

  return program
}
