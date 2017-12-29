/*
  eslint-disable consistent-return,
  no-console,
  no-param-reassign,
  import/no-extraneous-dependencies
*/
import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import express from 'express';
import proxy from 'proxy-middleware';
import url from 'url';
import webpackDevConfig from '../webpack/webpack.dev.config';

const ROOT_PATH = path.resolve(process.cwd());

export default () => {
  const app = express();

  // Use proxy to webpack dev server for dev environment
  app.use('/assets', proxy(url.parse('http://localhost:3002/assets')));

  app.get('/*', (req, res) => {
    res.sendFile(`${ROOT_PATH}/static/index.html`);
  });

  app.listen(3000, 'localhost', (err) => {
    if (err) {
      return console.log(err);
    }

    console.log('App listening at http://localhost:3000/');
  });

  const devServer = new WebpackDevServer(webpack(webpackDevConfig), {
    publicPath: webpackDevConfig.output.publicPath,
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    historyApiFallback: true,
    stats: {
      colors: true,
      version: true,
      errors: true,
      warnings: true
    },
  });

  devServer.listen(3002, 'localhost', (err) => {
    if (err) {
      return console.log(err);
    }

    console.log('Webpack Dev Server listening at http://localhost:3002/');
  });
};
