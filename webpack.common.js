const fs = require('fs')
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const postcssPresetEnv = require('postcss-preset-env');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

const paths = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist')
};
const pagesDir = `${paths.src}/pug/`;
const pages = fs.readdirSync(pagesDir).filter(fileName => fileName.endsWith('.pug'));

const checkPage = (pugFileName) => {
  if(pugFileName.includes('account')) {
    return ['icons','account']
  } else {
    return ['icons','main']
  }
};

module.exports = {
  entry: {
    //main: [path.resolve(__dirname, 'src/js/main.js'), path.resolve(__dirname, 'src/scss/main.scss')],
    main: path.resolve(__dirname, 'src/js/main.js'),
    //account: path.resolve(__dirname, 'src/js/account.js'),
    icons: path.resolve(__dirname, 'src/js/icons.js')
  },
  output: {
    filename: 'js/[name].bundle.js',
    path: `${paths.dist}`,
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin(),
    ],
  },
  module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.(sass|scss)$/,
          use: [
            { loader: MiniCssExtractPlugin.loader },
            { loader: 'css-loader', options: { importLoaders: 1 } },
            { loader: 'postcss-loader', options: {
              postcssOptions: {
                plugins: {
                  'postcss-preset-env': {
                    browsers: 'last 2 versions',
                    stage: 0,
                  }
                }
              }
            }},
            'sass-loader'
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          use: {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
              publicPath: '../fonts'
            }
          }
        },
        {
          test: /\.svg$/,
          use: [
            { loader: 'svg-sprite-loader', options: {
                extract: true,
                /*
                publicPath: '/',
                spriteFilename: './img/icons/icons.svg'
                */
                publicPath: 'img/icons/',
                spriteFilename: 'icons.svg'
              }
            }
          ]
        },
        {
          test: /\.pug$/,
          use: [
            { loader: 'html-loader', options: {
              minimize: false
            }},
            { loader: 'pug-html-loader', options: {
              pretty: true
            }}
          ]
        }
      ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].min.css',
    }),
    ...pages.map(page => new HtmlWebpackPlugin({
      template: `${pagesDir}/${page}`,
      filename: `./${page.replace(/\.pug/,'.html')}`,
      //favicon: `${paths.src}/img/favicon.ico`,
      minify: false,
      //chunks: checkPage(page)
    })),
    new SpriteLoaderPlugin({
      plainSprite: true
    })
  ]  
};
