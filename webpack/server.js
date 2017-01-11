var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var config = require('./local.config')

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  inline: true,
  historyApiFallback: true,
  watchOptions: {
      aggregateTimeout: 300,
      poll: true
  },
  stats: {
      colors: true,
  }
}).listen(3000, "0.0.0.0", function (err, result) {
  if (err) {
    console.log(err)
  }

  console.log('🌎 Listening on port: %s', 3000);
})