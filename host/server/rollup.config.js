import json from '@rollup/plugin-json'
import { defineConfig } from 'rollup'
import esbuild from 'rollup-plugin-esbuild'
import tsConfigPaths from 'rollup-plugin-tsconfig-paths'
import pack from './package.json' assert { type: 'json' }

const deps = (d) => (d ? Object.keys(d) : [])

export default defineConfig({
  input: 'src/index.ts',
  plugins: [tsConfigPaths(), json(), esbuild()],
  output: [
    {
      file: 'bin/claflow.server.mjs',
      format: 'esm',
      banner: '#!/usr/bin/env node',
      compact: true
    }
  ],
  external: [
    'dotenv/config',
    'fs/promises',
    'path',
    'node:http',
    ...deps(pack.dependencies)
  ]
})
