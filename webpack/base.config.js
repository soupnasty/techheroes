var path = require("path")
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')

const VENDOR = [
    'babel-polyfill',
    'history',
    'react',
    'react-dom',
    'react-redux',
    'react-router',
    'react-mixin',
    'classnames',
    'redux',
    'react-router-redux',
    'jquery',
];

module.exports = {
  context: __dirname,

  entry: {
      vendors: VENDOR,
      app: path.join(__dirname, '../techheroes/static')
  },

  output: {
      filename: "[name]-[hash].js",
      path: path.join(__dirname, '../techheroes/static/bundles/local/')
  },

  plugins: [
      new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
      new webpack.ProvidePlugin({
            '$': 'jquery',
            'jQuery': 'jquery',
            'window.jQuery': 'jquery'
        }),
  ],

  module: {
    loaders: [] // add all common loaders here
  },

  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx']
  },

}
