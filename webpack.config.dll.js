const webpack = require('webpack');
const path = require('path');
const clean = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    vendor: [
      'element-ui',
      'vue-router',
      'vuex',
      'vue',
      'axios',
      'numbro',
    ],
  },
  output: {
    path: path.join(__dirname, 'dll'),
    filename: '[name].dll.js',
    library: '[name]_[hash]',
  },
  plugins: [
    new clean.CleanWebpackPlugin(),
    new webpack.DllPlugin({
      path: path.join(__dirname, 'dll', '[name]-manifest.json'),
      name: '[name]_[hash]',
    })
  ],
};
