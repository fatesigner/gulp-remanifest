/**
 * gulpfile
 */

const path = require('path');
const gulp = require('gulp');
const replace = require('..');

gulp.task('replace', function() {
  const sourcesPath = path.join(__dirname, 'source');
  const outputPath = path.join(__dirname, 'output');
  const manifestJson = require(path.join(sourcesPath, 'manifest.json'));
  gulp.src([
    path.join(sourcesPath, '*.txt'),
    path.join(sourcesPath, '*.html'),
    path.join(sourcesPath, '*.css'),
    path.join(sourcesPath, '*.json'),
    path.join(sourcesPath, '*.js')
  ]).pipe(replace({
    manifest: manifestJson,
    prefix: '',
    // custom replace
    matched: function (source, unreved, reved) {
      const ext = path.extname(unreved);
      const _unreved = unreved.replace(new RegExp(ext + '$'), '');
      return source.replace(new RegExp(_unreved + '(.([A-Za-z0-9.]{5,}))?' + ext + '(\s{0,})?(["|\'])', 'gim'), reved + '$3$4');
    }
  })).pipe(gulp.dest(outputPath)).on('end', function () {
  });
});
