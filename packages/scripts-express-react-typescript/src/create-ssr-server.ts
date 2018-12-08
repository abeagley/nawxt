import express from 'express'
import http from 'http'
import https from 'https'

import { APP_DIR } from './paths'
import { genCerts } from './utils'

// Loaders / initializers
import { loadConfig } from './loaders'

const { USE_HTTPS } = process.env

export const createSSRServer = async (): Promise<http.Server | https.Server> => {
  const server = express()

  loadConfig(server, APP_DIR)

  let localServer: http.Server | https.Server

  if (!USE_HTTPS) {
    localServer = http.createServer(server)
  } else {
    const certificate = genCerts()
    localServer = https.createServer({ key: certificate, cert: certificate }, server)
  }

  return localServer
}
