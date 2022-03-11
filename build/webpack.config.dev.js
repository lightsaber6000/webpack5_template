const { getEntries } = require('./utils.js');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  mode: 'development',
  entry: getEntries('./src/pages', ['js', 'scss', 'twig']),
  module: {
    rules: [
      {
        test: /\.s[a|c]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
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
  plugins: [],
  resolve: {
    alias: {
      src: path.resolve(__dirname, '../src'),
      images: path.resolve(__dirname, '../src/assets/images'),
      partials: path.resolve(__dirname, '../src/partials'),
    },
  },
  devServer: {
    hot: true,
    compress: false,
    client: {
      reconnect: true,
      progress: true,
      overlay: true,
    },
    historyApiFallback: {
      index: '/index',
    },
  },
};

const pages = getEntries('./src/pages', 'twig');
const pagesConfig = Object.keys(pages).map((pathname) => {
  return new HtmlWebpackPlugin({
    inject: true,
    filename: `${pathname}.html`, // выходной путь html
    template: path.resolve(__dirname, `.${pages[pathname]}`), // путь к шаблону
    favicon: path.resolve(__dirname, '../src/assets/favicon.ico'),
  });
});

config.plugins = [...config.plugins, ...pagesConfig];

module.exports = config;
