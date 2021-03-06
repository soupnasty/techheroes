const path = require('path')
const webpack = require('webpack')
const BundleTracker = require('webpack-bundle-tracker')

const config = require('./base.config.js')

const docker_ip = '192.168.99.100'

config.devtool = '#eval-source-map'

// Use webpack dev server
config.entry = {
  app: [
    'webpack-dev-server/client?http://0.0.0.0:3000',
    'webpack/hot/only-dev-server',
    path.join(__dirname, '../techheroes/static')
  ]
}

// override django's STATIC_URL for webpack bundles
config.output.publicPath = `http://${docker_ip}:3000` + '/assets/bundles/'

// Add HotModuleReplacementPlugin and BundleTracker plugins
config.plugins = config.plugins.concat([
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  new BundleTracker({ filename: './webpack/webpack-stats-local.json' }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('development'),
      BASE_API_URL: JSON.stringify('http://0.0.0.0:8000/api/v1/'),
    } }),

])

// Add a loader for JSX files with react-hot enabled
config.module.loaders.push(
  { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['react-hot', 'babel'] },
  { test: /\.css$/, exclude: /node_modules/, loader: 'style-loader!css-loader' },
  { test: /\.scss$/, exclude: /node_modules/, loader: 'style-loader!css-loader?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!postcss-loader!sass-loader' }
)

module.exports = config
