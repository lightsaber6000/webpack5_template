const { getEntries } = require('./utils.js');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = (env) => {
  const config = {
    entry: getEntries('./src/pages', env === 'production'
      ? ['js', 'scss']
      : ['js', 'scss', 'twig']),
    plugins: [],
    resolve: {
      alias: {
        src: path.resolve(__dirname, '../src'),
        images: path.resolve(__dirname, '../src/assets/images'),
        partials: path.resolve(__dirname, '../src/partials'),
        sass: path.resolve(__dirname, '../src/sass'),
      },
    },
    parallelism: 10,
  };

  const pages = getEntries('./src/pages', 'twig');
  const pagesConfig = Object.keys(pages).map((pathname) => {
    return new HtmlWebpackPlugin({
      inject: 'body',
      minify: false,
      filename: `${pathname}.html`, // выходной путь html
      template: path.resolve(__dirname, `.${pages[pathname]}`), // путь к шаблону
      favicon: path.resolve(__dirname, '../src/assets/favicon.ico'),
      chunks: [pathname],
      chunksSortMode: 'manual',
    });
  });

  config.plugins = [...config.plugins, ...pagesConfig];

  return config;
};
