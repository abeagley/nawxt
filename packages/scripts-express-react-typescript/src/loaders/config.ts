import bodyParser from 'body-parser'
import express, { Express } from 'express'
import { join as pathJoin } from 'path'

export const loadConfig = (server: Express, rootDir: string) => {
  server.use(bodyParser.json())
  server.use('/static', express.static(pathJoin(rootDir, 'static')))
  server.use(express.static(pathJoin(rootDir, 'static')))
}
