const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const paclageJson = require('../package.json');
const commonConfig = require('./webpack.common');

const devConfig = {
  mode: 'development',
  output: {
    publicPath: "http://localhost:8080/"
  },
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: 'index.html',
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      remotes: {
        Marketing: 'marketing@http://localhost:8081/remoteEntry.js',
        Auth: 'auth@http://localhost:8082/remoteEntry.js',
        Dashboard: 'dashboard@http://localhost:8083/remoteEntry.js',

      },
      shared: paclageJson.dependencies
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
