const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  output: {
    publicPath: '',
  },
  module: {
    rules: [
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: picture => {
              const imgDirPath = path.relative(path.join(__dirname, 'src', 'img'), path.dirname(picture));
              return `${imgDirPath.replace(/\\/g,'/')}/[name].[ext]`;
            },
            outputPath: 'img/',
            publicPath: (url, resourcePath, context) => {
              const relativePath = path.relative(context, resourcePath)
              if (String(relativePath).includes('content')) {
                return `img/${url}`
              } else {
                return `../img/${url}`
              }
            }
          }
        }
      },
    ]
  },
  mode: 'production',
  devtool: 'source-map',
});
