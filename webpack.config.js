// const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/Main/Main.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    fallback: {
      "fs": false,
      "path": false,
      "os": false,
      "util": false,
    } 
  },
  output: {
    filename: 'Game.js',
    path: path.resolve(__dirname, 'dist'),
  },
  // plugins: [
  //   // fix "process is not defined" error:
  //   new webpack.ProvidePlugin({
  //     process: 'process/browser',
  //   }),
  // ],
  mode: 'development',
};