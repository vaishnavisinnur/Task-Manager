// webpack.config.js

const webpack = require('webpack');

module.exports = {
  // other webpack configuration options
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    hot: true,
  },
};
