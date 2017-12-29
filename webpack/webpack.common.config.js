const path = require('path');

const ROOT_PATH = path.resolve(process.cwd());

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: path.resolve(ROOT_PATH, 'node_modules'),
      }
    ],
  }
};
