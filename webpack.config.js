const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");  //css单独打包
const HtmlWebpackPlugin = require('html-webpack-plugin')

const glob = require('glob');

const svgDirs = []; // 如果需要本地部署图标，需要在此加入本地图标路径，本地部署方式见以下文档
// 把`antd-mobile/lib`目录下的 svg 文件加入进来，给 svg-sprite-loader 插件处理
glob.sync('node_modules/**/*antd-mobile/lib', {dot: true}).forEach(p => {
  svgDirs.push(new RegExp(p));
});

const theme = {'brand-primary': '#08C82F'}

const ip = "10.0.0.168";
const port = "3000";
const webpackConfig = {
  devtool: "source-map",
  entry: ['webpack-dev-server/client?http://' + ip + ':' + port,
    'webpack/hot/only-dev-server', "./src/index.js"],
  output: {
    path: path.join(__dirname, 'public/dist'),
    filename: '[name].js',
    publicPath: 'http://' + ip + ':' + port + '/react/'
  },
  babel: {
    "presets": ["es2015", "stage-0", "react"],
    "plugins": [["import", [{
      "libraryName": "antd-mobile",
      "libraryDirectory": "lib",
      "style": false,
    },]]]
  },
  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        exclude: function (path) {
          // 路径中含有 node_modules 的就不去解析。
          return !!path.match(/node_modules/);
        },
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
        },
      },
      {
        test: /\.css$/,
        loaders: [
          'style',
          'css',
          'autoprefixer'
        ]
      },
      {
        test: /\.less/,
        loader: ExtractTextPlugin.extract(
            'css-loader?sourceMap!' +
            `less-loader?{"sourceMap":true,"modifyVars":${JSON.stringify(theme)}}`
        ),
      },
      {test: /\.scss$/, loader: "style!css!sass"},

      {test: /\.(jpg|png|svg)$/, loader: "url-loader?limit=8192", exclude: svgDirs},

      {test: /\.svg$/, loader: 'svg-sprite', include: svgDirs},

      {test: /\.html$/, loader: "raw-loader"}

    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin("[name].css"),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      filename: 'index.html',
    })
  ]
};


module.exports = webpackConfig;
