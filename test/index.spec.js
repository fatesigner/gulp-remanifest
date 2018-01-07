/**
 * index.spec
 */

const test = require('ava');
const path = require('path');
const fs = require('fs');
const Core = require('../replace.core');

const manifestJson = require(path.join('..', 'example/source/manifest.json'));

test('replace html', async t => {
  const template = fs.readFileSync(path.resolve('example/source/index.html'), 'utf8');
  let renames = Core.convertManifest(manifestJson);
  let contents = Core.replace(renames, template);
  t.true(true);
});
