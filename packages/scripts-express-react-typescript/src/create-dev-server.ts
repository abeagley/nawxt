import chalk from 'chalk'
import Bundler from 'parcel-bundler'

import { APP_CACHE_DIR, APP_DIST_DIR, APP_SRC_ENTRY } from './paths'

export const createDevServer = async (port: any, useHttps: any) => {
  process.env.NODE_ENV = 'development'
  console.info(chalk.cyan('Starting server in HMR SPA development mode.'))

  process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason)
  })

  const bundler: any = new Bundler(APP_SRC_ENTRY, {
    cacheDir: APP_CACHE_DIR,
    hmr: true,
    host: '',
    https: (useHttps === 'true'),
    outDir: APP_DIST_DIR,
    throwErrors: false,
    watch: true
  } as any)

  try {
    await bundler.serve(
      parseInt(port, 10),
      (useHttps === 'true'),
      ''
    )
  } catch (e) {
    console.error(e)
  }
}
