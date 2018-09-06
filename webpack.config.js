const webpack = require('webpack');
const path = require('path');

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
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
  
  resolve: {
    extensions: ['*', '.js', '.jsx', '.css'],
    alias: {
      components: path.resolve(__dirname, 'src/components/')
    }
  },
  
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  
  devServer: {
    contentBase: './dist',
    hot: true
  }
};
