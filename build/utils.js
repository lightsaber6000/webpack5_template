const glob = require('glob');

exports.getEntries = function (context, extension) {
  if (context[context.length - 1] !== '/') {
    context += '/';
  }

  extension = Array.isArray(extension) ? extension : [extension];

  const match = extension.length > 1 ? `.{${extension.join(',')}}` : `.${extension[0]}`;
  const files = glob.sync(`${context}**/*${match}`);
  const entries = {};

  files.forEach((file) => {
    const match = extension.length > 1 ? extension.join('|') : extension[0];
    const re = new RegExp(`\.(${match})`, 'i');
    const prop = file.replace(context, '').replace(re, '');
    if (entries[prop] == null) entries[prop] = [];
    entries[prop] = [...entries[prop], file];
  });

  return entries;
};
