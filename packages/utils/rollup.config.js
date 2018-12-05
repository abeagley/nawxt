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

console.log(externalDeps)

export default {
  external: externalDeps.map(dep => dep).concat(['os', 'path']),
  input: './src/index.ts',
  output: [
    { file: pkg.main, format: 'cjs', sourcemap: true, banner: '#!/usr/bin/env node' },
    { file: pkg.module, format: 'es', sourcemap: true, banner: '#!/usr/bin/env node' },
  ],
  plugins: [
    resolve({
      customResolveOptions: {
        moduleDirectory: 'node_modules'
      }
    }),
    commonjs(),
    json(),
    typescript({
      rollupCommonJSResolveHack: true,
      tsconfig: './tsconfig.json',
      useTsconfigDeclarationDir: true
    })
  ],
  watch: {
    include: './src/**/*'
  }
}
