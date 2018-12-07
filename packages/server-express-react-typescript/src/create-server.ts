import { get as getAppDir } from 'app-root-dir'
import express from 'express'
import fs from 'fs'
import { join as pathJoin } from 'path'
import { genCerts } from './utils'

// Loaders / initializers
import { loadConfig, loadRoutes } from './loaders'
import { getNextConfig } from './next-config'

const appDir = getAppDir()

interface ICreateServerReturn {
  admin: http.Server | https.Server
  local: http.Server | https.Server
}

export const createServer = async (): Promise<ICreateServerReturn> => {
  const srcDir = pathJoin(appDir, 'src')
  const env = process.env.NODE_ENV || 'development'

  const server = express()
  const app = next({
    conf: getNextConfig(appDir),
    dev: (process.env.NODE_ENV === 'development'),
    dir: srcDir
  })

  loadConfig(server, appDir, env)
  loadRoutes(appDir, app, server)

  try {
    await app.prepare()
  } catch (e) {
    // TODO: Better error handling
    throw e
  }

  const { NODE_EXTRA_CA_CERTS, USE_HTTPS } = process.env

  let localServer: http.Server | https.Server

  if (!USE_HTTPS) {
    localServer = http.createServer(server)
  } else {
    const certificate = NODE_EXTRA_CA_CERTS
      ? fs.readFileSync((NODE_EXTRA_CA_CERTS as string))
      : genCerts()

    localServer = https.createServer({ key: certificate, cert: certificate }, server)
  }

  return {
    admin: http.createServer(express()),
    local: localServer
  }
}
