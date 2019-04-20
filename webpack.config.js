const fs = require('fs');
const path = require('path');
const slsw = require('serverless-webpack');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

const {
  lib: {
    entries: entry,
    webpack: { isLocal },
  },
} = slsw;

const paths = {
  context: __dirname,
  babelrc: path.resolve(__dirname, '.babelrc'),
  src: path.resolve(__dirname, 'src'),
  node: path.resolve(__dirname, 'node_modules'),
  webpackCache: path.resolve(__dirname, '.webpack'),
};

const babelConfig = JSON.parse(fs.readFileSync(paths.babelrc));

module.exports = {
  entry,
  output: {
    libraryTarget: 'commonjs2',
    path: paths.webpackCache,
    filename: '[name].js',
    sourceMapFilename: '[file].map',
  },
  target: 'node',
  devtool: 'source-map',
  mode: isLocal ? 'development' : 'production',
  context: paths.context,
  resolve: {
    modules: [paths.src, 'node_modules'],
    extensions: ['.js'],
    symlinks: false,
    alias: {
      deepmerge$: path.resolve(__dirname, './node_modules/deepmerge/dist/umd.js'),
    },
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: { loader: 'babel-loader', options: babelConfig },
        include: paths.src,
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    minimize: false,
    removeAvailableModules: !isLocal,
    removeEmptyChunks: !isLocal,
    mergeDuplicateChunks: !isLocal,
  },
  plugins: [
    new webpack.DefinePlugin({ 'global.GENTLY': false }),
    new HardSourceWebpackPlugin(),
  ],
};

