const webpack = require('webpack')
const BundleTracker = require('webpack-bundle-tracker')

const config = require('./base.config.js')

config.output.path = require('path').resolve('../techheroes/static/bundles/prod/')

config.plugins = config.plugins.concat([
  new BundleTracker({ filename: './webpack/webpack-stats-prod.json' }),

  // removes a lot of debugging code in React
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
      BASE_API_URL: JSON.stringify('https://techheroes.xyz/api/v1/'),
    } }),

  // keeps hashes consistent between compilations
  new webpack.optimize.OccurenceOrderPlugin(),

  // minifies your code
  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      warnings: false
    }
  })
])

// Add a loader for JSX files
config.module.loaders.push(
  { test: /\.js?$/, exclude: /node_modules/, loader: 'babel' },
  { test: /\.css$/, exclude: /node_modules/, loader: 'style-loader!autoprefixer-loader!css-loader' }
)

module.exports = config
