const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');
const commonConfig = require('./webpack.common');
const devConfig = {
  mode: 'development',
  output: {
    publicPath: "http://localhost:8083/"
  },
  devServer: {
    port: 8083,
    historyApiFallback: {
      index: "/index.html"
    },
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "dashboard",
      filename: "remoteEntry.js",
      exposes: {
        './Dashboard': './src/bootstrap.js'
      },
      shared: packageJson.dependencies
    }),

  ]
}

module.exports = merge(commonConfig, devConfig)
