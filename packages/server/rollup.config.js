import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import json from 'rollup-plugin-json'

const mainPkg = require('../../package.json')
const pkg = require('./package.json')

const externalDeps = Object.keys(pkg.dependencies).concat(Object.keys(mainPkg.dependencies))

export default {
  external: externalDeps.concat(['os', 'path']),
  input: './src/index.ts',
  output: [
    { file: pkg.main, format: 'cjs', sourcemap: true },
    { file: pkg.module, format: 'es', sourcemap: true },
  ],
  plugins: [
    json(),
    resolve(),
    commonjs(),
    typescript({
      rollupCommonJSResolveHack: true,
      useTsconfigDeclarationDir: true
    })
  ],
  watch: {
    include: './src/**/*'
  }
}
