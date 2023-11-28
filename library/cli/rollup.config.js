import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import esbuild from 'rollup-plugin-esbuild'
import pack from './package.json' assert { type: 'json' }

const deps = d => (d ? Object.keys(d) : []);

const config = [
  {
    input: 'src/index.ts',
    plugins: [
      commonjs(),
      json(),
      esbuild(),
    ],
    output: {
      file: 'bin/claflow.cli.mjs',
      format: 'esm',
      banner: '#!/usr/bin/env node',
      compact: true
    },
    external: [
      ...deps(pack.dependencies),
      ...deps(pack.devDependencies)
    ]
  }
]

export default config