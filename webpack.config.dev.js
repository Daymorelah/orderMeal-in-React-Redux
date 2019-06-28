import webpack from 'webpack';
import path from 'path';
import Dotenv from 'dotenv-webpack';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

export default {
  devtool: 'eval-source-map',
  mode: 'development',
  entry: [
    'webpack-hot-middleware/client?reload=true', // note that it reloads the page if hot module reloading fails.
    path.resolve(__dirname, 'src/index.jsx')
  ],
  target: 'web',
  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.EnvironmentPlugin({ 'process.env.NODE_ENV': 'development' }),
    new Dotenv(),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)?/,
        include: path.join(__dirname, 'src'),
        exclude: '/node_modules/',
        use: 'babel-loader'
      },
      {
        test: /(\.css)$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ],
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
};
