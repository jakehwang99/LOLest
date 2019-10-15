var webpack = require('webpack')

module.exports = {
    entry: './src/index.js',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          loaders: [
            'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
            'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
          ]
        },
        {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
        }
      ]
    },
    resolve: {
      extensions: ['*', '.js', '.jsx', '.css']
    },
    output: {
      path: __dirname + '/dist',
      publicPath: '/',
      filename: 'bundle.js'
    },
    devServer: {
      contentBase: './dist',
    }
  };