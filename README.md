# gulp-remanifest

[![build][travis-image]][travis-url]
[![commitizen][commitizen-image]][commitizen-url]
[![codecov][codecov-image]][codecov-url]
[![prettier][prettier-image]][prettier-url]
[![download][download-image]][download-url]
[![npm][npm-image]][npm-url]
[![semantic][semantic-image]][semantic-url]

[npm-image]: https://img.shields.io/npm/v/gulp-remanifest.svg?color=blue&logo=npm
[npm-url]: https://npmjs.com/package/gulp-remanifest
[travis-image]: https://travis-ci.com/fatesigner/gulp-remanifest.svg?color=green&token=i21P7stb8bZPNjZakvsi&branch=master
[travis-url]: https://travis-ci.com/fatesigner/gulp-remanifest
[codecov-image]: https://codecov.io/gh/fatesigner/gulp-remanifest/branch/master/graph/badge.svg?&token=i5Q9N7m8v5
[codecov-url]: https://codecov.io/gh/fatesigner/gulp-remanifest
[david-image]: https://david-dm.org/fatesigner/gulp-remanifest.svg
[david-url]: https://david-dm.org/fatesigner/gulp-remanifest
[prettier-image]: https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?logo=prettier
[prettier-url]: https://github.com/prettier/prettier
[download-image]: https://img.shields.io/npm/dw/gulp-remanifest.svg?color=yellowgreen
[download-url]: https://npmjs.com/package/gulp-remanifest
[commitizen-image]: https://img.shields.io/badge/commitizen-friendly-green.svg
[commitizen-url]: http://commitizen.github.io/cz-cli/
[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square
[semantic-url]: https://opensource.org/licenses/MIT

一个实现文件名hash值替换的gulp插件.

**此插件基于 [gulp-rev-replace](https://github.com/jamesknelson/gulp-rev-replace).**

## Install

```bash
npm i gulp-remanifest -D
```

## 使用

添加以下代码到 `gulpfile.js`:

### 简单的字符串替换
```javascript
const remanifest = require('gulp-remanifest');
const manifestJson = require('manifest.json');

gulp.task('remanifest', function(){
  gulp.src(['*.html'])
    .pipe(remanifest({ manifest: manifestJson }))
    .pipe(gulp.dest('output/'));
});
```

### 添加替换前缀字符串和自定义匹配逻辑
```javascript
const remanifest = require('gulp-remanifest');
const manifestJson = require('manifest.json');

gulp.task('remanifest', function(){
  gulp.src(['*.html'])
    .pipe(remanifest({ 
      manifest: manifestJson,
      prefix: 'build/',
      matched: function(source, unreved, reved) {
            const ext = path.extname(unreved);
            const _unreved = unreved.replace(new RegExp(ext + '$'), '');
            return source.replace(new RegExp(_unreved + '(.([A-Za-z0-9.]{5,}))?' + ext + '(\s{0,})?(["|\'])', 'gim'), reved + '$3$4');
          }
    }))
    .pipe(gulp.dest('output/'));
});
```

## 源文件
```html
<link rel="icon" type="image/x-icon" href="assets/icon.png"/>
<link href="index.css" rel="stylesheet">
<script src="src/index.js"></script>
<script>
  require('src/index.js');
</script>
```
### manifest.json
```json
{
  "index.js": "index.b0ce1e8.js",
  "index.css": "index.4f36a77.css",
  "assets/icon.png": "assets/icon.4336db5.png"
}
```
## 替换后输出
```html
<link rel="icon" type="image/x-icon" href="assets/icon.4336db5.png"/>
<link href="index.4f36a77.css" rel="stylesheet">
<script src="index.b0ce1e8.js"></script>
<script>
  require('index.b0ce1e8.js');
</script>
```
### 如果manifest.json的值更新了，可以无缝替换.
```json
{
  "index.js": "index.b0ce1e8e4d1ff123.js",
  "index.css": "index.4f36a77fg1f37dg8.css",
  "assets/icon.png": "assets/icon.4336db5fs51w34.png"
}
```
```html
<link rel="icon" type="image/x-icon" href="assets/icon.4336db5fs51w34.png"/>
<link href="index.4f36a77fg1f37dg8.css" rel="stylesheet">
<script src="index.b0ce1e8e4d1ff123.js"></script>
<script>
  require('index.b0ce1e8e4d1ff123.js');
</script>
```

## API

### remanifest([options])

#### options
Type: `object`

##### manifest
Type: `object`
```json
{
  "index.js": "index.b0ce1e8.js",
  "index.css": "index.4f36a77.css",
  "assets/icon.png": "assets/icon.4336db5.png"
}
```

##### prefix
Type: `String`

###### 添加替换的前缀字符串.

##### matched
Type: `Function`

###### 可以使用此函数自定义替换逻辑并返回修改后的源文件
