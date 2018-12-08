export const getEnv = () => {
  const env = process.env.NODE_ENV
  switch (env) {
    case 'production':
      return 'production.env'
    case 'staging':
      return 'staging.env'
    case 'test':
      return 'test.env'
    default:
      return 'development.env'
  }
}
