const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");  //css单独打包
const HtmlWebpackPlugin = require('html-webpack-plugin')
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
const glob = require('glob');

const svgDirs = []; // 如果需要本地部署图标，需要在此加入本地图标路径，本地部署方式见以下文档
// 把`antd-mobile/lib`目录下的 svg 文件加入进来，给 svg-sprite-loader 插件处理
glob.sync('node_modules/**/*antd-mobile/lib', {dot: true}).forEach(p => {
  svgDirs.push(new RegExp(p));
});
//自定义antd-mobile主题颜色
const theme = {
  'color-text-base': '#333',
  'fill-body': '#F3F3F3',
  'brand-primary': '#08C82F',
  'border-color-base': '#F3F3F3'
}
//index入口管理
const entry = require('./entry');

const webpackConfig = {
  devtool: false,
  entry: entry,

  output: {
    path: path.join(__dirname, './build'),
    filename: '[name]/index.js',
  },
  module: {

    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          plugins: [
            ["import", [{"style": true, "libraryName": "antd-mobile"}]]
          ],
          presets: ['react', 'es2015', 'stage-0'],
        },
      },
      {test: /\.css$/i, loader: ExtractTextPlugin.extract('style', 'css!postcss')},
      {
        test: /\.less/,
        loader: ExtractTextPlugin.extract(
            'css?sourceMap!postcss!' +
            `less-loader?{"sourceMap":true,"modifyVars":${JSON.stringify(theme)}}`
        ),
      },
      {test: /\.scss$/, loader: "style!css!sass"},

      {test: /\.(jpg|png|svg)$/, loader: "url-loader?limit=8192", exclude: svgDirs},

      {test: /\.svg$/, loader: 'svg-sprite', include: svgDirs},

      {test: /\.html$/, loader: "raw-loader"}
    ],
  },
  postcss: [
    autoprefixer({
      browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
    }),
    pxtorem({rootValue: 100, propWhiteList: []})
  ],
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
    new ExtractTextPlugin("[name]/index.css?[contenthash]"),
    new webpack.optimize.CommonsChunkPlugin('common', 'common/index.js')

  ]

};


(function handleHtml() {
  for (let k in entry) {
    let filename = k + "/index.html";
    webpackConfig.plugins.push(new HtmlWebpackPlugin({
      template: 'public/index.html',
      filename: filename,
      chunks: [k, 'common']
    }))
  }
})()


module.exports = webpackConfig;