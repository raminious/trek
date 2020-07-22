const path = require('path')

const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { merge } = require('webpack-merge')

const common = require('./base.js')

const config = {
  mode: 'production',
  devtool: false,
  entry: {
    app: ['@babel/polyfill', path.resolve(__dirname, '../app/index.tsx')],
    vendor: ['react', 'react-dom']
  },
  optimization: {
    runtimeChunk: true,
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          ecma: 6
        }
      })
    ],
    concatenateModules: false,
    noEmitOnErrors: true,
    namedModules: true,
    namedChunks: true,
    splitChunks: {
      chunks: 'all'
    }
  },
  performance: {
    hints: 'warning',
    maxAssetSize: 400 * 1024,
    maxEntrypointSize: 300 * 1024
  },
  plugins: [
    new webpack.optimize.AggressiveMergingPlugin(),
    new MiniCssExtractPlugin({
      filename: 'app.[hash].css',
      allChunks: true
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../app/static'),
          to: path.resolve(__dirname, '../../dist/web/static')
        }
      ],
      options: {
        concurrency: 100
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          }
        ]
      }
    ]
  }
}

module.exports = merge(common, config)
