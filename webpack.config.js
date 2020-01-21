/* webpack.config.js */

const path = require('path');
const resolve = path.resolve.bind(path, __dirname);
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const IconfontPlugin = require('iconfont-plugin-webpack');
const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  entry: {
    'js/bundle.js': './assets/js/main.js',
    'css/style.css': './assets/scss/main.scss'
  },
  output: {
    path: path.resolve(__dirname, './public/'),
    filename: '[name]'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    browsers: ['last 2 versions']
                  },
                  useBuiltIns: 'usage',
                  corejs: '3'
                  // debug: true
                }
              ]
            ]
          }
        }
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true,
                sourceMap: true
              }
            },
            {
              loader: "group-css-media-queries-loader",
              options: { sourceMap: true }
            },
            'svg-transform-loader/encode-query',
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                includePaths: [
                  path.resolve(__dirname, 'node_modules')
                ]
              }
            }
          ]
        })
      },
      {
        test: /\.(svg|eot|ttf|woff|woff2)$/,
        loader: "url-loader",
      },
    ]
  },
  externals: {
    jquery: 'jQuery',
    $: 'jQuery'
  },
  plugins: [
    new IconfontPlugin({
      src: resolve('assets/svg'),
      family: 'icons',
      dest: {
        font: 'assets/fonts/icons/[family].[type]',
        css: 'assets/scss/icons/_[family].scss'
      },
      watch: {
        cwd: __dirname,
        pattern: 'assets/svg/*.svg'
      },
      cssTemplate: require(resolve('assets/scss/icons/template'))
    }),
    new ExtractTextPlugin({
      filename: '../public/css/style.css'
    })
  ]
};
