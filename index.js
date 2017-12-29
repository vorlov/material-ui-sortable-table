require('babel-polyfill'); // Provides polyfills necessary for a full ES2015+ environment
require('babel-register'); // babel require hook
require('./server/devServer').default(); // Start server in ES2015+ environment
