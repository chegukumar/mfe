const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');
const commonConfig = require('./webpack.common');
const devConfig = {
  mode: 'development',
  output: {
    publicPath: "http://localhost:8082/"
  },
  devServer: {
    port: 8082,
    historyApiFallback: {
      index: "/index.html"
    }
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "auth",
      filename: "remoteEntry.js",
      exposes: {
        './Auth': './src/bootstrap.js'
      },
      shared: packageJson.dependencies
    }),

  ]
}

module.exports = merge(commonConfig, devConfig)
