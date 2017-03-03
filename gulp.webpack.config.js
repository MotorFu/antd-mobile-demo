const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");  //css单独打包
const theme = {'primary-color': '#08C82F'};
const HtmlWebpackPlugin = require('html-webpack-plugin')
const glob = require('glob');

const svgDirs = []; // 如果需要本地部署图标，需要在此加入本地图标路径，本地部署方式见以下文档
// 把`antd-mobile/lib`目录下的 svg 文件加入进来，给 svg-sprite-loader 插件处理
glob.sync('node_modules/**/*antd-mobile/lib', {dot: true}).forEach(p => {
  svgDirs.push(new RegExp(p));
});

module.exports = {
  devtool: false,
  entry: "./src/index.js",

  output: {
    path: path.join(__dirname, './build'),
    filename: '[name].js',
  },
  module: {

    loaders: [
      {
        test: /\.js?$/,
        exclude: (path) => {
          // 路径中含有 node_modules 的就不去解析。
          return !!path.match(/node_modules/);
        },
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          cacheDirectory: true
        },
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      },
      {
        test: /\.less/,
        loader: ExtractTextPlugin.extract(
            'css?sourceMap!' +
            `less-loader?{"sourceMap":true,"modifyVars":${JSON.stringify(theme)}}`
        ),
      },
      {test: /\.scss$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")},
      {test: /\.(jpg|png|svg)$/, loader: "url-loader?limit=8192", exclude: svgDirs},
      {test: /\.svg$/, loader: 'svg-sprite', include: svgDirs},
    ],
  },
  babel: {
    "presets": ["es2015", "stage-0", "react"],
    "plugins": [["import", [{
      "libraryName": "antd-mobile",
      "libraryDirectory": "lib",   // default: lib
      "style": false,
    }]]]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {warnings: false},
      output: {comments: false}
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.LimitChunkCountPlugin({maxChunks: 15}),
    new webpack.optimize.MinChunkSizePlugin({minChunkSize: 10000}),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      filename: 'index.html',
    }),
    new ExtractTextPlugin("[name].css")

  ]

};
