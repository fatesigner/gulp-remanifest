﻿# gulp-remanifest

>一个实现文件名hash值替换的gulp插件.

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
