const { merge } = require('webpack-merge');
const webpackConfigBase = require('./webpack.config.base.js');

module.exports = merge(webpackConfigBase('development'), {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.s[a|c]ss$/i,
        use: [
          'style-loader',
          { loader: "css-loader", options: { sourceMap: true } },
          { loader: "sass-loader", options: { sourceMap: true } },
        ],
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
  devServer: {
    hot: true,
    compress: false,
    client: {
      reconnect: true,
      overlay: true,
    },
    historyApiFallback: {
      index: '/main',
    },
  },
});
