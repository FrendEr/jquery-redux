const path = require('path');
const webpack = require('webpack');
const concat = require('lodash/concat');
const find = require('find');
const autoprefixer = require('autoprefixer');
const lessvars = require('postcss-less-vars');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const env = process.env.NODE_ENV;
const entryMap = {};

const files = find.fileSync(/\.entry\.js$/, path.resolve(__dirname, './src/'));
files.map(function(file) {
  const fileMapKey = file.replace(/\.js$/, '').split('src')[1].replace(/\\/g, '/');  // windows 下文件的路径中反斜杠需要替换成斜杠
  entryMap[fileMapKey] = file;
});

const config = {
  entry: entryMap,
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dev/dist',
    filename: '[name].js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      __DEV__: true,
    }),
    new ExtractTextPlugin('[name].css'),
    new DashboardPlugin()
  ],
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx', '.json', '.less'],
    alias: {
      basePath: path.resolve(__dirname, 'src'),
    },
  },
  externals: {
    'jquery': 'jQuery'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/,
      },
      {
        test: /\.(less|css)$/,
        loader: ExtractTextPlugin.extract('style', 'css!less!postcss')
      },
      {
        test: /\.(gif|jpe?g|png|ico)$/,
        loader: 'url?limit=1024&name=[name]-[sha512:hash:base64:7].[ext]&outputPath=/images/'
      },
      {
        test: /\.dot$/,
        loader: 'dot'
      }
    ]
  },
  postcss: () => [
    autoprefixer({
      browsers: ['last 5 version', 'Firefox < 20']
    }),
    lessvars({})
  ]
};

module.exports = config;
