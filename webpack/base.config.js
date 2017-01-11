var path = require("path")
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')


module.exports = {
  context: __dirname,

  entry: {
      vendors: ['react'],
      SampleApp: path.join(__dirname, '../techheroes/static/SampleApp')
  },

  output: {
      filename: "[name]-[hash].js",
      path: path.join(__dirname, '../techheroes/static/bundles/local/')
  },

  plugins: [
      new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
  ],

  module: {
    loaders: [] // add all common loaders here
  },

  resolve: {
    modulesDirectories: ['node_modules', 'bower_components'],
    extensions: ['', '.js', '.jsx']
  },

}
