const webpack = require('webpack');
const path = require('path');
const Dotenv = require('dotenv-webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.jsx',
  target: 'web',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js'
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './index.prod.html',
    }),
    new webpack.EnvironmentPlugin({ 'process.env.NODE_ENV': 'production' }),
    new Dotenv(),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)?/,
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/,
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
