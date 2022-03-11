const glob = require('glob');

// имя файла должно совпадать с именем папки
exports.getEntries = function (context, extension) {
  const entries = {};
  const folders = glob.sync(`${context}/*`);

  if (context[context.length - 1] !== '/') {
    context += '/';
  }

  extension = Array.isArray(extension) ? extension.map(el => `.${el}`) : `.${extension}` ;

  folders.forEach((folder) => {
    const name = folder.replace(context, '');
    entries[`${name}/${name}`] = Array.isArray(extension)
      ? extension.map(el => glob.sync(`${context}**/*${el}`)).flat()
      : glob.sync(`${context}**/*${extension}`)[0];
  });

  // console.log('entries:');
  // console.log(entries);

  return entries;
};
