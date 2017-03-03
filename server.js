const webpack = require('webpack');
const config = require('./webpack.config.js');

const port = 3000;
const WebpackDevServer = require('webpack-dev-server');
new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: {
    colors: true
  }
}).listen(port, function (err, result) {
  console.log('Listening at port:' + port);
});
