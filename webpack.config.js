/* global process,__dirname:true */
const path = require("path");
const webpack = require("webpack");
const env = process.env.NODE_ENV;
const entry = {
  zoomable: './src/index.js',
  "zoomable.min": './src/index.js'
};
const plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.ProvidePlugin({
    React: 'react'
  })
];
module.exports = {
  mode: env,
  entry: entry,
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    libraryExport: 'default',
    library: 'Zoomable',
    libraryTarget: 'umd'
  },
  performance: {
    hints: false
  },
  devServer: {
    disableHostCheck: true,
    historyApiFallback: true,
    hot: true,
    inline: true,
    port: 8080,
  //  host: '0.0.0.0',
    open: true,
    openPage: 'example/test.html'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  module: {
    rules: [{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        loader: 'babel-loader'
      }, {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }, {
        test: /\.(less|css)$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'less-loader']
      }, {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }
    ]
  },
  plugins: plugins
};