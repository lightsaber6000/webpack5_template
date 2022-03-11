const { getEntries } = require('./utils.js');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: getEntries('./src/pages', ['js', 'scss', 'twig']),
  plugins: [],
  resolve: {
    alias: {
      src: path.resolve(__dirname, '../src'),
      images: path.resolve(__dirname, '../src/assets/images'),
      partials: path.resolve(__dirname, '../src/partials'),
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
