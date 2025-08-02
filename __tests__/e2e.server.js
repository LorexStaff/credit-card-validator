const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../webpack.config');

const compiler = webpack(config);
const server = new WebpackDevServer(config.devServer, compiler);

(async () => {
  await server.start();
  console.log('Server is running on http://localhost:9000');

  if (process.send) {
    process.send('ok');
  }
})();
