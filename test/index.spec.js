/**
 * index.spec
 */

const path = require('path');
const fs = require('fs');
const Path = require('path');
const Chai = require('chai');
const Expect = Chai.expect;

const Core = require('../src/core');
const manifestJson = require(path.join('..', 'example/source/manifest.json'));

const ENV = require('../build/env')();

describe('# Test.', function() {
  it('## run replace.', function() {
    const template = fs.readFileSync(Path.join(ENV.rootPath, 'example/source/index.html'), 'utf8');
    let renames = Core.convertManifest(manifestJson);
    let contentStr = Core.replace(renames, template).toString();
    Expect(Object.keys(manifestJson).some(function(key) {
      return contentStr.indexOf(manifestJson[key]) > -1;
    })).to.be.true;
  });
});
