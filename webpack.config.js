var path = require('path');

module.exports = {
  entry : './src/js/app.js',
  output: {
    filename: 'www/js/bundle.js'
  },
  devtool: 'inline-source-map',
  resolve: {
    root: [ path.join(__dirname, 'node_modules') ],
    extensions: ['', '.webpack.js', '.web.js', '.js']
  },
  module: {
    loaders: [
      { test: /\.html$/, loader: 'html', exculde: /node_modules/ },
      { test: /\.styl$/, loader: 'style!css!stylus', exculde: /node_modules/ },
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  }
};