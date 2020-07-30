import typescript from '@rollup/plugin-typescript'

import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import { nodeResolve } from '@rollup/plugin-node-resolve'

import pkg from './package.json'

const plugins = [nodeResolve()]

export default [
  {
    plugins: [...plugins, commonjs(), typescript()],
    input: 'src/index.ts',
    output: {
      file: 'lib/trek.js',
      format: 'cjs'
    }
  },
  {
    plugins: [
      ...plugins,
      typescript({
        declaration: true,
        outDir: 'es/trek'
      })
    ],
    input: 'src/index.ts',
    preserveModules: true,
    output: {
      dir: 'es/trek',
      format: 'esm'
    }
  },
  {
    plugins: [
      ...plugins,
      typescript({
        sourceMap: true
      }),
      terser()
    ],
    input: 'src/index.ts',
    output: {
      name: 'trekRecord',
      file: pkg.unpkg.replace('.js', '.min.js'),
      format: 'iife',
      sourcemap: true
    }
  }
]
