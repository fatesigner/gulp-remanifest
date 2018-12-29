/**
 * clean
 * 清理 build 目录
 */

const Gulp = require('gulp');
const Del = require('del');

Gulp.task('clean', async function() {
  const ENV = require('../env')();
  await Del(ENV.outputPath, { force: true });
});
