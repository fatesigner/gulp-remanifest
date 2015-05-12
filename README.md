# gulp-manifest-replace
> A gulp plugin that replace specified sources from manifes json.

**This plugin is an improved and maintained fork of [gulp-rev-replace](https://github.com/jamesknelson/gulp-rev-replace).**

## Usage

First, install `gulp-manifest-replace` as a development dependency:

```shell
npm i -D @jenkshiny/gulp-manifest-replace
```

Then, add it to your `gulpfile.js`:

### Simple string replace
```javascript
const replace = require('gulp-manifest-replace');
const manifestJson = require('manifest.json');

gulp.task('replace', function(){
  gulp.src(['*.html'])
    .pipe(replace({ manifest: manifestJson }))
    .pipe(gulp.dest('output/'));
});
```

### String replace with prefix and matched callback
```javascript
const replace = require('gulp-manifest-replace');
const manifestJson = require('manifest.json');

gulp.task('replace', function(){
  gulp.src(['*.html'])
    .pipe(replace({ 
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

## Before
### source
```html
<link rel="icon" type="image/x-icon" href="assets/icon.png"/>
<link href="index.css" rel="stylesheet">
<script src="index.js"></script>
<script>
  require('index.js');
</script>
```
### manifest
```json
{
  "index.js": "index.b0ce1e8.js",
  "index.css": "index.4f36a77.css",
  "assets/icon.png": "assets/icon.4336db5.png"
}
```
## After Replace
### output
```html
<link rel="icon" type="image/x-icon" href="assets/icon.4336db5.png"/>
<link href="index.4f36a77.css" rel="stylesheet">
<script src="index.b0ce1e8.js"></script>
<script>
  require('index.b0ce1e8.js');
</script>
```
### Of course, when your manifest.json was changed, you can override the output files for replacement.
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

gulp-manifest-replace can be called with a string or regex.

### replace([options])

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

###### Add a prefix to each replacement.

##### matched
Type: `Function`

###### You can use this function to customize the replacement logic and return the modified source.
