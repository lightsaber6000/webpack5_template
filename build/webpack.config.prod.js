const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { merge } = require('webpack-merge');
const path = require('path');
const webpackConfigBase = require('./webpack.config.base.js');

module.exports = merge(webpackConfigBase, {
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
        use: ['html-loader', 'twig-html-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        parallel: 10,
      }),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[fullhash].css",
    }),
  ],
  output: {
    pathinfo: false,
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].[fullhash].js',
    clean: true,
  },
});
