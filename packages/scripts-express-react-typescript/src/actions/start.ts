import chalk from 'chalk'
import { createDevServer } from '../create-dev-server'
import { createSSRServer } from '../create-ssr-server'

const startSSR = async (port: any) => {
  console.info(chalk.cyan('Starting server in non-development SSR mode.'))

  const server = await createSSRServer()

  await server.listen(port, () => {
    console.info(chalk.cyan(`Server started and listening on port: ${port}`))
  })
}

export const start = async () => {
  const { NODE_ENV, PORT, USE_HTTPS } = process.env

  const result = (NODE_ENV === 'development' || NODE_ENV === undefined) ? await createDevServer(PORT, USE_HTTPS) : await startSSR(PORT)
  return result
}
