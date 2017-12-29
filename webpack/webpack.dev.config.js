/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.config');

const ROOT_PATH = path.resolve(process.cwd());

module.exports = merge(common, {
  devtool: 'source-map',
  entry: {
    bundle: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:3002',
      'webpack/hot/only-dev-server',
      'babel-polyfill',
      './src/index',
    ],
  },
  output: {
    path: path.resolve(ROOT_PATH, 'dist'),
    filename: 'bundle.js',
    publicPath: '/assets/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        include: path.resolve(ROOT_PATH, 'src'),
      },
      {
        test: /(\.css|\.scss)$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader',
          options: {
            sourceMap: true,
            modules: true,
            importLoaders: 1,
            localIdentName: '[name]__[local]___[hash:base64:5]'
          }
        }, {
          loader: 'postcss-loader',
        }, {
          loader: 'sass-loader'
        }],
        exclude: path.resolve(ROOT_PATH, 'node_modules'),
      },
      {
        test: /(\.css|\.scss)$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'postcss-loader',
        }, {
          loader: 'sass-loader',
        }],
        include: path.resolve(ROOT_PATH, 'node_modules'),
      }
    ],
  },
});
