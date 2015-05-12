/**
 * replace.core
 */

const path = require('path');

module.exports = {
  convertManifest: ConvertManifest,
  replace: Replace
};

function ConvertManifest(manifest, prefix) {
  let renames = [];
  Object.keys(manifest).forEach(function (srcFile) {
    renames.push({
      unreved: sep(srcFile),
      reved: (prefix || '') + sep(manifest[srcFile])
    });
  });
  return renames;
}

function Replace(renames, contents, matched) {
  renames.forEach(function replaceOnce(rename) {
    let extname = path.extname(rename.unreved);
    let key_ = rename.unreved.replace(new RegExp(extname + '$'), '');
    if (matched) {
      contents = matched(contents, rename.unreved, rename.reved);
    } else {
      contents = contents.replace(new RegExp(key_ + '(.([A-Za-z0-9.]{5,}))?' + extname + '(\s{0,})?(["|\'])', 'gim'), rename.reved + '$3$4');
    }
  });
  let _contents = new Buffer(contents, 'utf8');
  // Add a step to determine whether the operation is a file with bom
  let bomTag = ['239', '187', '191'];
  if (_contents.length && !(_contents[0].toString(16).toLowerCase() === 'ef' && _contents[1].toString(16).toLowerCase() === 'bb' && _contents[3].toString(16).toLowerCase() === 'bf')) {
    _contents = Buffer.concat([new Buffer(bomTag), _contents], _contents.length + 3);
  }
  return _contents;
}

function sep(filePath) {
  if (path.sep !== '/') {
    filePath = filePath.split(path.sep).join('/');
  }
  return filePath;
}
