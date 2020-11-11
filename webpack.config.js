const path = require('path');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(
      __dirname, 'modules/asset/ui/public'
    ),
    filename: 'site.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          ExtractCssChunks.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new ExtractCssChunks({
      filename: '../../../../public/css/main.css'
    })
  ]
};
