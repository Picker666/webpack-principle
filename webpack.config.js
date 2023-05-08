const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackCommentRemovePlugin = require('./plugins/webpack-comment-remove-plugin');

module.exports = {
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    filename: 'built.js',
    path: path.join(__dirname, 'dist'),
    clean: true
  },
  mode: 'development',
  devServer: {
    port: 9001,
    hot: true,
  },
  module: {
    rules: []
  },
  plugins: [
    new HtmlWebpackPlugin({
      template:path.join(__dirname,  './src/index.html'),
      filename: 'index.html',
    }),
    new WebpackCommentRemovePlugin({doneNote: 'have remove...'})
  ],
}