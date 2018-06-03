# gulp-module-resolver

Resolve aliased dependencies based on TS Config paths map

<!-- Section to uncomment when we publish - for now we have to install from file reference
# Installation

```bash
yarn add @taqtile/publish-package-json

# or

npm i @taqtile/publish-package-json
```
-->

# Basic usage

```javascript
const gulp       = require('gulp');
const resolver   = require('./packages/gulp-module-resolver');
const ts         = require('gulp-typescript');

const tsProject = ts.createProject('tsconfig.json');
const outDir    = tsProject.config.compilerOptions.outDir;

gulp.task('default', () => {
  return tsProject
    .src()
    .pipe(tsProject())
    .pipe(resolver({ rootPath: outDir }))
    .pipe(gulp.dest(outDir))
  ;
});
```
