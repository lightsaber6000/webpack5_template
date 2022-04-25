const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { merge } = require('webpack-merge');
const path = require('path');
const webpackConfigBase = require('./webpack.config.base.js');
const HtmlBeautifierPlugin = require('html-beautifier-webpack-plugin');

module.exports = merge(webpackConfigBase('production'), {
  mode: 'production',
  module: {
    rules: [
      {
        test: /.s[a|c]ss$/i,
        use: [MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  'autoprefixer',
                  'postcss-sort-media-queries',
                ],
              },
              sourceMap: true,
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.twig$/,
        use: [
          {
            loader: "html-loader",
            options: {
              minimize: false,
            }
          },
          {
            loader: "twig-html-loader",
          }
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: '[name][ext]'
        }
      },
      {
        test: /\.(svg)$/i,
        type: 'asset/inline',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: '[name][ext]'
        }
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        parallel: 10,
      }),
      new TerserPlugin({
        parallel: 10,
      }),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new HtmlBeautifierPlugin()
  ],
  output: {
    pathinfo: false,
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    clean: true,
  },
});
