import { exitWithLog } from '@nawxt/utils'
import npmsearch from 'libnpmsearch'

export const getLatestPackageVersion = async (name: string): Promise<string> => {
  let items: any[] = []

  try {
    items = await npmsearch(name, { limit: 1 })
  } catch (e) {
    exitWithLog(`Unable to query npm for package: ${name}`)
  }

  if (items.length === 0) {
    exitWithLog(`No npm package results for: ${name}. Aborting.`)
  }

  const sPkg = items.shift()

  return `"${sPkg.name}": "^${sPkg.version}"`
}
