const path = require('path');

module.exports = {
  mode: 'production',
  entry: "./src/main.js",
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist', 'assets', 'scripts'),
    publicPath: 'assets/scripts',
    clean: true
  },
  devtool: 'cheap-source-map'
}