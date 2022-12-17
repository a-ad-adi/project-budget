const prod = process.env.NODE_ENV === 'production';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { DefinePlugin } = require('webpack');
const dotenv = require('dotenv');

module.exports = {
  mode: prod ? 'production' : 'development',
  entry: './frontend/index.tsx',
  output: {
    path: __dirname + '/dist/frontend/',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        resolve: {
          extensions: ['.ts', '.tsx', '.js', '.json'],
        },
        use: [{
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig.frontend.json'
          }
        }]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ]
  },
  devtool: prod ? undefined : 'source-map',
  plugins: [
    new DefinePlugin({
      'process.env': JSON.stringify(dotenv.config().parsed),
    }),
    new HtmlWebpackPlugin({
      template: 'frontend/index.html',
    }),
    new MiniCssExtractPlugin(),
  ],
};
