const path = require('path');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');
module.exports = {
  entry: {
    render: './index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  plugins:[
    new Dotenv(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ],
  mode: 'development'
  // mode: 'production'
};