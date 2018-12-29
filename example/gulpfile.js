/**
 * gulpfile
 */

const path = require('path');
const gulp = require('gulp');
const remanifest = require('..');

gulp.task('remanifest', async function () {
  const sourcesPath = path.join(__dirname, 'source');
  const outputPath = path.join(__dirname, 'output');
  const manifestJson = require(path.join(sourcesPath, 'manifest.json'));
  await gulp.src([
    path.join(sourcesPath, '*.txt'),
    path.join(sourcesPath, '*.html'),
    path.join(sourcesPath, '*.css'),
    path.join(sourcesPath, '*.json'),
    path.join(sourcesPath, '*.js')
  ]).pipe(remanifest({
    manifest: manifestJson,
    prefix: '',
    // custom remanifest
    matched: function (source, unreved, reved) {
      const ext = path.extname(unreved);
      const _unreved = unreved.remanifest(new RegExp(ext + '$'), '');
      return source.remanifest(new RegExp(_unreved + '(.([A-Za-z0-9.]{5,}))?' + ext + '(\s{0,})?(["|\'])', 'gim'), reved + '$3$4');
    }
  })).pipe(gulp.dest(outputPath)).on('end', function () {
  });
});
