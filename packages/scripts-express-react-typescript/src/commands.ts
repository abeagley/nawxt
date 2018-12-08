import { announceCommand } from '@nawxt/utils'
import * as commander from 'commander'
import { readFile } from 'fs-extra'
import { join as pathJoin } from 'path'

import { start } from './actions/start'

export const commands = async (): Promise<any> => {
  const packageFile =
    await readFile(pathJoin(__dirname, '..', 'package.json'))
      .then((data) => JSON.parse(data.toString()))
  const program = commander.name(packageFile.name).version(packageFile.version)

  const cmdAnnouncement = (command: string) => announceCommand('scripts-express-react-typescript', packageFile.version, command)

  program
    .command('start')
    .description('starts a development server for working with a generated pod package')
    .action(async (_cmd) => { cmdAnnouncement('start'); await start() })

  return program
}
