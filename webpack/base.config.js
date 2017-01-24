const path = require('path')
const webpack = require('webpack')
const BundleTracker = require('webpack-bundle-tracker')

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
    filename: '[name]-[hash].js',
    path: path.join(__dirname, '../techheroes/static/bundles/local/')
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
  ],

  module: {
    loaders: [
      {
        test: /\.jpe?g$|\.gif$|\.png$/,
        loader: 'file-loader?name=style/images/[name].[ext]'
      },
      {
        test: /\.woff(\?.*)?$/,
        loader: 'url-loader?name=style/fonts/[name].[ext]&limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.woff2(\?.*)?$/,
        loader: 'url-loader?name=style/fonts/[name].[ext]&limit=10000&mimetype=application/font-woff2'
      },
      {
        test: /\.ttf(\?.*)?$/,
        loader: 'url-loader?name=style/fonts/[name].[ext]&limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?.*)?$/,
        loader: 'file-loader?name=style/fonts/[name].[ext]'
      },
      {
        test: /\.otf(\?.*)?$/,
        loader: 'file-loader?name=style/fonts/[name].[ext]&mimetype=application/font-otf'
      },
      {
        test: /\.svg(\?.*)?$/,
        loader: 'url-loader?name=style/fonts/[name].[ext]&limit=10000&mimetype=image/svg+xml'
      },
      {
        test: /\.json(\?.*)?$/,
        loader: 'file-loader?name=files/[name].[ext]'
      }
    ]
  },

  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx']
  },

}
