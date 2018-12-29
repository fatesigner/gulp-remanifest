const Through = require('through2');
const Core = require('./core');

let defaultOptions = {
  manifest: {},
  prefix: ''
};

module.exports = function (options) {
  let sources = [];
  options = Object.assign(defaultOptions, options);
  return Through.obj(function (file, enc, callback) {
    if (file == null) {
      return callback();
    }
    sources.push(file);
    callback();
  }, function (callback) {
    let stream = this;
    let renames = Core.convertManifest(options.manifest, options.prefix);
    sources.forEach(function (file) {
      let contents = file.contents.toString();
      contents = Core.replace(renames, contents, options.matched);
      file.contents = contents;
      stream.push(file);
    });
    callback();
  });
};
