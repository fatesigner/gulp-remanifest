/**
 * global
 */

const Path = require('path');

const Utils = require('./utils');

module.exports = function() {
  const isProd = Utils.IsProd();
  const rootPath = Path.resolve(__dirname, '..');
  const buildPath = Path.join(rootPath, 'build');
  const srcPath = Path.join(rootPath, 'src');
  const outputPath = Path.join(rootPath, 'dist');
  const publicPath = isProd ? '' : '';
  const nodeModulesPath = Path.resolve(rootPath, 'node_modules');
  return {
    rootPath,
    buildPath,
    srcPath,
    outputPath,
    publicPath,
    nodeModulesPath
  };
};
