const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
  return {
    entry: env === 'production'
      ? {main: ['./src/main.js', './src/main.scss']}
      : {main: ['./src/main.js', './src/main.scss', './src/main.twig']},
    resolve: {
      alias: {
        src: path.resolve(__dirname, '../src'),
        images: path.resolve(__dirname, '../src/assets/images'),
        partials: path.resolve(__dirname, '../src/partials'),
        sass: path.resolve(__dirname, '../src/sass'),
      },
    },
    parallelism: 10,
    plugins: [
      new HtmlWebpackPlugin({
        inject: 'body',
        minify: false,
        filename: env === 'production'
          ? 'main.html'
          : `main/index.html`,
        template: path.resolve(__dirname, `../src/main.twig`), // путь к шаблону
        favicon: path.resolve(__dirname, '../src/assets/favicon.ico'),
      })
    ],
  };
};
