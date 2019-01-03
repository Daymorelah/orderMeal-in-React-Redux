import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from './webpack.config.dev';

/* eslint-disable no-console */

const PORT = process.env.PORT || 3000;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, './src/index.html'));
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Sever is up and running on port ${PORT}`);
  }
});