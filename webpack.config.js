// The config for webpack version ^2.2.1 and webpack-dev-server version ^2.4.1
const CONFIGS = require('./config')

var path = require('path')
var webpack = require('webpack')

var env = process.env.NODE_ENV

var envConfig = (CONFIGS[env]) ? CONFIGS[env] : CONFIGS.local

var outputConfig = (envConfig) ? envConfig.webpack['output'] : {
  webpack: {
    output: {}
  }
}

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: path.resolve(process.cwd(), outputConfig['path']),
    publicPath: outputConfig['publicPath'],
    filename: outputConfig['filename']
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: path.join(process.cwd(), 'src')
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        query: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.s[a|c]ss$/,
        loader: 'style!css!sass'
      }
    ]
  },
  vue: {
    loaders: {
      scss: 'style!css!sass'
    }
  }
}

if (env === 'production' || env === 'development' || env === 'staging') {
  module.exports.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(env)
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    // optimize module ids by occurrence count
    new webpack.optimize.OccurrenceOrderPlugin()
  ]
} else {
  console.log('webpack', env)
  module.exports.devtool = '#source-map'
  module.exports.devServer = {
    compress: true,
    contentBase: 'static/',
    historyApiFallback: true,
    host: process.env.VCAP_APP_HOST || 'localhost',
    open: true,
    port: process.env.PORT || 8080
  }
}
