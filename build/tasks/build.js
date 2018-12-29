/**
 * build
 */

const Path = require('path');
const Gulp = require('gulp');

Gulp.task('build', async function() {
  const ENV = require('../env')();
  Gulp.src(Path.join(ENV.srcPath, '**/*')).pipe(
    Gulp.dest(ENV.outputPath)
  );
  // copy npm publish files to output
  Gulp.src(
    [
      'example/',
      'package.json',
      'README.md'
    ].map(x => Path.join(ENV.rootPath, x))
  ).pipe(Gulp.dest(ENV.outputPath));
});
