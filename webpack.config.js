var path = require('path');
var webpack = require('webpack');

var minimize = process.argv.indexOf('--minimize') !== -1;
var plugins = [];

if (minimize) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({ sourceMap: false }))
}

module.exports = {
  entry : './src/app.js',
  output: {
    filename: 'www/js/bundle.js'
  },
  devtool: 'inline-source-map',
  resolve: {
    root: [ path.join(__dirname, 'node_modules') ],
    extensions: ['', '.webpack.js', '.web.js', '.js']
  },
  plugins: plugins,
  module: {
    loaders: [
      { test: /\.html$/, loader: 'html', exculde: /node_modules/ },
      { test: /\.styl$/, loader: 'style!css!stylus', exculde: /node_modules/ },
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  }
};