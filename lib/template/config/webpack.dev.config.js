const config  = require('./webpack.base.config')
const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const isDev = process.env.NODE_ENV === 'development'

module.exports = merge(config, {
  devtool:'source-map',
  entry: {
    app:[
      "react-hot-loader/patch",
      path.resolve(__dirname,'../src/index.js'),
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: path.join(__dirname,'../src/index.html')
    }),
    //new ExtractTextPlugin('css/[name].[chunkhash:8].css'),
    // 热加载插件
    new webpack.HotModuleReplacementPlugin(),

    // 可在业务 js 代码中使用 __DEV__ 判断是否是dev模式（dev模式下可以提示错误、测试报告等, production模式不提示）
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
    }),
  ],
  devServer: {
    contentBase:"../build",// 本地服务器在哪个目录搭建页面，一般我们在当前目录即可；
    //historyApiFallback:true,//当我们搭建spa应用时非常有用，它使用的是HTML5 History Api，任意的跳转或404响应可以指向 index.html 页面；
    inline:true,//用来支持dev-server自动刷新的配置，webpack有两种模式支持自动刷新，一种是iframe模式，一种是inline模式；使用iframe模式是不需要在devServer进行配置的，只需使用特定的URL格式访问即可；不过我们一般还是常用inline模式，在devServer中对inline设置为true后，当我们启动webpack-dev-server时仍要需要配置inline才能生效
    hot:true,// 启动webpack热模块替换特性,这里是个坑
    port:'8080',//配置服务端口号
    host:'0.0.0.0',//服务器的IP地址，可以使用IP也可以使用localhost
    compress:true,//服务端压缩是否开启,
    overlay:{  //在浏览器中显示遮罩 提示报错信息， 警告信息等
      errors:true //只显示错误信息
    },
    publicPath:'/public',
    historyApiFallback: {
      index:"/public/index.html"
    }
  }
})
