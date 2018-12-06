// Polyfill for 8.x since 10.x supports fs promises

import { readFile as fsReadFile } from 'fs'

export const readFile = (path: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fsReadFile(path, (err, data) => {
      if (err) { return reject(err) }

      resolve(data.toString())
    })
  })
}
