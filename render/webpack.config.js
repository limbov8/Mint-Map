const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'render.js'
  },
  plugins:[
   new Dotenv()
  ],
  // mode: 'development'
  mode: 'production'
};