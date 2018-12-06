const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  // The `target: node` option tells webpack not to touch
  // any built-in modules like fs or path.
  target: 'node',
  // With the production mode, webpack adds default configurations
  // add apply built-in optimizations. Also, process.env.NODE_ENV is set to production
  mode: 'production',
  // The entry module of our app.
  // Webpack will traverse the entire dependency tree from this module
  // and generate a single bundle file.
  entry: './index.js',
  output: {
    // The bundle file is placed in build/app.js
    path: path.resolve(__dirname, 'build'),
    filename: 'server.js',
  },
  module: {
    rules: [
      {
        // This rule tells webpack to use babel to convert all .js files from ES6 to ES5.
        // babel-loader will look for configurations in the .babelrc file
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  // `devtool` lets use choose a style for source-mapping.
  // With the value `source-map`, an app.js.map file will be created
  // to map the compiled code with the original one.
  devtool: 'source-map',
  plugins: [
    // BannerPlugin adds text (banner) to the top of our bundle.
    // We use it here to require source-map-support to replace paths and line numbers
    // to their original paths and line numbers in stack traces.
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: true,
    }),
  ],
  // `externals` defines modules that should not be included
  // in our final bundle. `nodeExternals` tells webpack to
  // ignore all `node_modules` dependencies.
  externals: [nodeExternals()],
};