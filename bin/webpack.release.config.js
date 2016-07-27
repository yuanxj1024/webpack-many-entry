var webpack = require('webpack');
var path = require('path');
var getEntry = require('./getEntry.js');
var complie = require('./complie.js');
var alias = require('../app/plugin_alias.js');

var containerPath = path.resolve('./');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractSASS = new ExtractTextPlugin('[name].css');

// 自定义插件
var staticURLReplacePlugin = require('./staticURLReplacePlugin.js');

// 读取系统配置
var globalConfig = require('../app/global.config.json');
globalConfig = complie(globalConfig);

// 获取所有js入口
var entrys = getEntry('./app/src/*/*/*.js');
console.log('entrys=', entrys);
// 获取所有页面
var pages = getEntry('./app/src/*/*/*.jade');
console.log(pages);

// webpack处理的插件
var plugins = [];
plugins.push(extractSASS);
plugins.push(new staticURLReplacePlugin());

//  提取公共文件
// plugins.push(new webpack.optimize.CommonsChunkPlugin('common', 'common.js'));

// 处理jade页面
for (var chunkname in pages) {
  console.log('chunkname=', chunkname);
  var conf = {
    filename: chunkname + '.html',
    template: pages[chunkname],
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: false
    },
    chunks: [chunkname],
    hash: true,
    globalConfig: globalConfig
  }
  plugins.push(new HtmlWebpackPlugin(conf));
}

function getFileName(name) {
  console.log('name = ', name);
  var arr = name.split('\/');
  return arr[arr.length - 1] + '.js';
}

/**
 * 配置webpack
 */
var config = {
  entry: entrys,
  output: {
    path: path.resolve(containerPath, './app/dist/'),
    publicPath: './',
    filename: '[name].js'
  },
  devtool: 'source-map',
  module: {
    loaders: [{
        test: /\.html$/,
        loader: 'raw',
        exclude: /(node_modules)/
      },
      // {
      //   test: /\.js$/,
      //   loader: 'eslint-loader',
      //   exclude: /(node_modules)/
      // },
      {
        test: /\.scss$/i,
        loader: extractSASS.extract(['css', 'sass'])
      }, {
        test: /.jade$/,
        loader: 'jade-loader',
        exclude: /(node_modules)/
      }, {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=8192&name=img/[name].[ext]?[hash:8]'
      }
    ]
  },
  plugins: plugins,
  resolve: {
    alias: alias,
    extensions: ['', '.js', '.css', '.scss', '.jade', '.png', '.jpg']
  },
  externals: {
    // jquery: 'window.jQuery',
    // backbone: 'window.Backbone',
    // underscore: 'window._'
  }
};
module.exports = config;
