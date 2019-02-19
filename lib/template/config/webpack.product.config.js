const config  = require('./webpack.base.config')
const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')

module.exports = merge(config, {
  entry: {
    app:path.resolve(__dirname,'../src/index.js')
  },
  plugins:[
    new ExtractTextPlugin('css/[name].[chunkhash:8].css'),
    // 为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
    new webpack.optimize.OccurrenceOrderPlugin(),
    // 定义为生产环境，编译 React 时压缩到最小
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
    ///webpack4已移除UglifyJsPlugin
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     //supresses warnings, usually from module minification
    //     warnings: false
    //   }
    // }),
    // 提供公共代码
    // webpack.optimize.CommonsChunkPlugin has been removed, please use config.optimization.splitChunks instead
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'common', filename: 'js/[name].[chunkhash:8].js'
    // }),
    //压缩css
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: {removeAll: true } },
      canPrint: true
    })
  ]
})
