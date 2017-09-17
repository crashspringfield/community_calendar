const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: [
    'babel-polyfill',
    './public/src/js/index.js'
  ],
  output: {
    path: path.join(__dirname, 'public', 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/dist/',
    sourceMapFilename: 'public/build/bundle.map'
  },
  devtool: '#source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/(node_modules|bower_components)/],
        use: [{
          loader: 'babel-loader',
          options: { presets: ['es2015', 'stage-2', 'react'] }
        }],
      },
      {
        test: /\.scss$/,
        exclude: [/(node_modules|bower_components)/],
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: true,
              localIdentName: '[folder]_[name]__[local]--[hash:base64:6]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => {
                return [
                  require('autoprefixer')()
                ];
              },
              sourceMap: true
            }
          },
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      },
    ]
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common'
    }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true
        },
        output: {
          comments: false
        }
      }),
  ],
  resolve: {
    modules: ['node_modules', 'src'],
      extensions: [".webpack.js", ".web.js", ".js", '.scss']
  }
};
