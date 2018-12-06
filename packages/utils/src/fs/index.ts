// Polyfill for 8.x since 10.x supports fs promises

import klaw, { Item } from 'klaw-sync'

export const walkDir = (path: string, filter?: (item: Item) => boolean): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    try {
      const paths = klaw(path, { traverseAll: true, filter } as any)
      resolve(paths.map((kPath) => kPath.path))
    } catch (e) {
      reject(e)
    }
  })
}
