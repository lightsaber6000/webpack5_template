multipage(entry for every page) 
features: sass/scss, twig, babel
autoprefixer, cssnano, combine-media-queries, hotreload

имя файла в pages должно совпадать с именем папки
пример:
/pages/index/index.twig
/pages/index/index.scss
/pages/index/index.js

dev конфиг(npm run serve) не выгружается на диск, хранится в памяти, не минифицируется, не транпилится
prod конфиг собирается в папке dist
