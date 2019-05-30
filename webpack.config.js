const webpack = require('webpack');

const config = {
  entry: ['./app/index.js'],
  output: {
    path: __dirname + '/build',
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        loader:'babel-loader',
        test: /\.js$/,
        exclude:  /node_modules/,
        query: {
            presets: ['es2015'] 
        }
      },
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.css']
  },
  devServer:{
    port: 3000,
    contentBase: __dirname + '/build',
    inline: true
  },
  mode: 'development',
  watch: true,
  plugins: [
    new webpack.ProvidePlugin({
      'Quill': 'quill'
    })
  ]
}
module.exports = config;
