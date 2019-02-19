'use strict'

const path = require('path')


// const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  resolve:{
    extensions: ['*', '.js', '.json', '.less','.jsx', '.scss'],
    alias: {
      '@components': path.join(__dirname,'../src/components/'),
      '@': path.join(__dirname,'../src/')
    }
  },
  output: {
    path: path.join(__dirname, "../build"),
    filename: 'client-app.js',
    publicPath: '/public/'
  },
  module:{
    rules : [
      {
        test: /\.(js|jsx)$/,
        use : {
          loader : "babel-loader"
        },
        exclude : /node_modules/
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader:'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: (loader) => [    //postcss-loader的插件
                  //require('postcss-import')({root: loader.resourcePath}),  //将css文件中的通过@import导入的css打包在一起
                  // require('postcss-cssnext')(),
                  require('autoprefixer')({   //自动添加浏览器前缀名
                      browsers: ['last 5 versions']
                  }),
              ]
            }
          },
         'less-loader'
        ]
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader:'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: (loader) => [    //postcss-loader的插件
                  //require('postcss-import')({root: loader.resourcePath}),  //将css文件中的通过@import导入的css打包在一起
                  // require('postcss-cssnext')(),
                  require('autoprefixer')({   //自动添加浏览器前缀名
                      browsers: ['last 5 versions']
                  }),
              ]
            }
          },
         'sass-loader'
        ]
      },
      {
        test : /\.css$/,
        use : [{loader : "style-loader"},{loader : "css-loader"}]
      },
      {
        test: /\.(png|gif|jpg|jpe?g|bmp)$/i,
        use : [
          {
            loader : 'url-loader',
            options : {
              limit : '8192'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|svg|ttf|eot)($|\?)/i,
        use: {
          loader: 'url-loader',
          options: {
            limit: '8192'
          }
        }
      }
    ]
  },
  plugins:[]
}


