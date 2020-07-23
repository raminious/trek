const path = require('path')

const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')

function resolvePath(dirPath) {
  return path.resolve(__dirname, dirPath)
}

module.exports = {
  entry: {
    app: resolvePath('../app/index')
  },
  output: {
    filename:
      process.env.NODE_ENV !== 'production' ? '[name].js' : '[name].[hash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: resolvePath('../../dist/web'),
    publicPath: '/'
  },
  resolve: {
    modules: [resolvePath('../app'), 'node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.css'],
    alias: {
      '@app': resolvePath('../app')
    }
  },
  module: {
    rules: [
      {
        test: /\.(ts|js|tsx|jsx)$/,
        exclude: /node_modules/,
        loader: require.resolve('babel-loader'),
        options: {
          cacheDirectory: true
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'file-loader'
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new Dotenv({
      safe: true
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../app/index.html'),
      filename: 'index.html',
      minify: true
    })
  ]
}
