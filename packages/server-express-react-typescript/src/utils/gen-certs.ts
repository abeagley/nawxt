import { get as appDir } from 'app-root-dir'
import fs from 'fs'
import { join as pathJoin } from 'path'
import selfsigned from 'selfsigned'

export const genCerts = () => {
  const certPath = pathJoin(appDir(), '.nawxt', 'config', 'server.pem')

  const certExists = fs.existsSync(certPath)

  if (!certExists) {
    const pems = selfsigned.generate([{ name: 'nawxtDev', value: 'nawxtDev' }], {
      days: 365
    })

    fs.writeFileSync(certPath, pems.private + pems.cert, { encoding: 'utf8' })
  }

  return fs.readFileSync(certPath)
}
