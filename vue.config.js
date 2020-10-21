const webpack = require('webpack');
const fs = require('fs');

// import webpack from 'webpack'
// import fs from 'fs'
const packageJson = fs.readFileSync('./package.json');
const version = JSON.parse(packageJson).version || 0;

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          HD_APP_VERSION: '"' + version + '"'
        }
      })
    ]
  },
  pluginOptions: {
    electronBuilder: {
      // preload: 'src/server.js',
      nodeIntegration: true,
      linux: {
        target: 'deb',
        category: 'System'
      }
    }
  }
};
