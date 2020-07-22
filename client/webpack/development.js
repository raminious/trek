const path = require('path')

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin')
const { merge } = require('webpack-merge')

const common = require('./base.js')

const basePath = path.resolve(__dirname, '../app')

const config = {
  mode: 'development',
  entry: ['@babel/polyfill'],
  devtool: 'source-map',
  devServer: {
    port: 8088,
    compress: true,
    inline: true,
    hot: true,
    historyApiFallback: {
      disableDotRule: true
    },
    contentBase: basePath
  },
  module: {
    rules: [
      {
        test: /\.css/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } }
        ]
      }
    ]
  },
  plugins: [
    new ForkTsCheckerNotifierWebpackPlugin({ alwaysNotify: false }),
    new ForkTsCheckerWebpackPlugin({
      async: true,
      typescript: {
        enabled: true,
        configFile: path.resolve(basePath, '../tsconfig.json')
      }
    })
  ]
}

module.exports = merge(common, config)
