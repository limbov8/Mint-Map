const path = require('path');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');
module.exports = {
  entry: {
    render: './index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    // filename: 'render.js'
    filename: '[name].js',
  },
  plugins:[
    new Dotenv(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    // new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/)
  ],
  // performance: { 
  //   hints: false 
  // },
  // mode: 'development'
  mode: 'production'
};