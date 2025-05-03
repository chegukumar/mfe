const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const paclageJson = require('../package.json');
const commonConfig = require('./webpack.common');

const devConfig = {
  mode: 'development',
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: 'index.html',
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      remotes: {
        Marketing: 'marketing@http://localhost:8081/remoteEntry.js'
      },
      shared: paclageJson.dependencies
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
