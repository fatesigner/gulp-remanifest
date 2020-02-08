'use strict';

const Through = require('through2');
const Core = require('./core');

const defaultOptions = {
  manifest: {},
  prefix: ''
};

module.exports = function(options) {
  const sources = [];
  options = Object.assign(defaultOptions, options);
  return Through.obj(
    function(file, enc, callback) {
      if (file == null) {
        return callback();
      }
      sources.push(file);
      callback();
    },
    function(callback) {
      const stream = this;
      const renames = Core.convertManifest(options.manifest, options.prefix);
      sources.forEach(function(file) {
        let contents = file.contents.toString();
        contents = Core.replace(renames, contents, options.matched);
        file.contents = contents;
        stream.push(file);
      });
      callback();
    }
  );
};
