import typescript from 'rollup-plugin-typescript'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

import pkg from './package.json'

const plugins = [typescript(), resolve()]

export default [
  {
    plugins: [...plugins, commonjs()],
    input: 'src/index.ts',
    output: {
      file: 'lib/trek.js',
      format: 'cjs'
    }
  },
  {
    plugins,
    input: 'src/index.ts',
    preserveModules: true,
    output: {
      dir: 'es/trek',
      format: 'esm'
    }
  },
  {
    plugins: [...plugins, terser()],
    input: 'src/index.ts',
    output: {
      name: 'trekRecord',
      file: pkg.unpkg.replace('.js', '.min.js'),
      format: 'iife',
      sourcemap: true
    }
  }
]
