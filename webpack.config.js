var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, './public');
var APP_DIR = path.resolve(__dirname, './src/client');

const config = {
   entry: {
     main: APP_DIR + '/index.js'
   },
   devtool: 'source-map', 
   output: {
     filename: 'bundle.js',
     path: BUILD_DIR
   },
   devServer: {
    contentBase: './public',
    hot: true
  },
   module: {
    rules: [
     {
       test: /(\.css|.scss)$/,
       use: [{
           loader: "style-loader" // creates style nodes from JS strings
       }, {
           loader: "css-loader" // translates CSS into CommonJS
       }, {
           loader: "sass-loader" // compiles Sass to CSS
       }]
     },
     {
       test: /\.(jsx|js)?$/,
       use: [{
         loader: "babel-loader",
         options: {
           // Transpiles JSX and ES6
           presets: ['react', 'es2015', 'stage-3'], 
           plugins: ["transform-object-rest-spread"]
         }
       }]
     }
    ],

  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
  
};

module.exports = config;