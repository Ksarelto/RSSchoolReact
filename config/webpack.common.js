const { join } = require('path');
const webpack = require('webpack');
require("babel-polyfill");
function createConfig({
  target,
}) {
  // Root of project
  let root = join(__dirname, '../');

  // Source directory
  let src = join(root, 'src');

  // Name of output bundles
  let name = `${target}.js`

  // Path for compiled assets
  let dist = join(root, 'dist', target);

  let IS_SERVER = target === 'server';
  let IS_CLIENT = target === 'client';

  return {
    name: target,
    entry: ['babel-polyfill', join(src, target, target)],

     mode: 'development',
    // mode: 'production',
    output: {
      path: dist,
      filename: name,
      chunkFilename: name,
    },

    resolve: {
      modules: [
        'node_modules',
        'src'
      ],
      extensions: ['.tsx', '.ts', '.js'],
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
              test: /\.(js|jsx|tsx|ts)$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env'],
                },
              },
            },
            {
              test: /\.(?:ico|gif|png|jpg|jpeg|svg|webp)$/i,
              type: 'asset/resource',
            },
          ],
    },

    plugins: [
      new webpack.DefinePlugin({
        IS_CLIENT: JSON.stringify(IS_CLIENT),
        IS_SERVER: JSON.stringify(IS_SERVER),
        'typeof window': JSON.stringify(IS_CLIENT ? 'object' : 'undefined')
      }),
    ],
  };
}

module.exports = {
  createConfig,
};
