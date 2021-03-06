import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import json from 'rollup-plugin-json'

const mainPkg = require('../../package.json')
const pkg = require('./package.json')

const externalDeps = Object.keys(pkg.dependencies)
  .concat(Object.keys(pkg.devDependencies))
  .concat(Object.keys(mainPkg.dependencies))
  .concat(Object.keys(mainPkg.devDependencies))

export default {
  external: externalDeps.concat(['fs', 'path']),
  input: './src/index.ts',
  output: [
    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'es' },
  ],
  plugins: [
    resolve({
      customResolveOptions: {
        extensions: [ '.mjs', '.js', '.jsx', '.json', 'ts', 'tsx' ],
        moduleDirectory: '../../node_modules'
      }
    }),
    commonjs(),
    json(),
    typescript({
      rollupCommonJSResolveHack: true,
      useTsconfigDeclarationDir: true
    })
  ],
  watch: {
    include: './src/**/*'
  }
}
