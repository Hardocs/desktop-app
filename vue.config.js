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
      nodeIntegration: true,
      // preload: 'src/server.js',

      builderOptions: {
        appId: 'hardocs.github.io',
        productName: 'Hardocs Desktop',
        // copyright: '',
        linux: {
          target: 'snap',
          category: 'System',
          icon: 'src/assets/logo.png'
        },
        // win: {
        //   target: 'nsis',
        //   oneClick: true,
        //   category: 'System',
        //   installerIcon: 'src/assets/favicon.ico',
        //   uninstallerIcon: 'src/assets/favicon.ico',
        //   shortcutName: 'Hardocs'
        // },
        mac: {
          category: 'public.app-category.utilities',
          target: 'dmg'
          // type: 'dis'
        },
        publish: ['github'],
        // options placed here will be merged with default configuration and passed to electron-builder
        files: ['**/*'],
        extraFiles: [
          {
            from: 'guides',
            to: 'guides',
            filter: ['**/*']
          }
        ]
      }
    }
  }
};
