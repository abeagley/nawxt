import fs from 'fs'
import { join as pathJoin } from 'path'
import selfsigned from 'selfsigned'

import { APP_NAWXT_CONFIG_DIR } from '../paths'

export const genCerts = () => {
  const certPath = pathJoin(APP_NAWXT_CONFIG_DIR, 'server.pem')

  const certExists = fs.existsSync(certPath)

  if (!certExists) {
    const pems = selfsigned.generate([{ name: 'nawxtDev', value: 'nawxtDev' }], {
      days: 365
    })

    fs.writeFileSync(certPath, pems.private + pems.cert, { encoding: 'utf8' })
  }

  return fs.readFileSync(certPath)
}
