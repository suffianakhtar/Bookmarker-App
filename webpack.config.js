const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist', 'assets', 'scripts'),
    publicPath: '/assets/scripts/',
    clean: false
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist')
    },
    hot: true
  }
};
