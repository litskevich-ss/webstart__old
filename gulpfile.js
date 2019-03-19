var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');
var tinyPNG = require('gulp-tinypng-compress');
var minifyJS = require('gulp-js-minify');

gulp.task('minify-css', function (done) {
  return gulp.src('./src/css/*.css')
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe(gulp.dest('dist/css/'))

  done();
});

gulp.task('minify-js', function (done) {

  return gulp.src(['./src/js/*.js', '!./src/js/*.min.js'])
    .pipe(minifyJS())
    .pipe(gulp.dest('dist/js/'))
    .pipe(gulp.src('./src/js/*.min.js'))
    .pipe(gulp.dest('dist/js/'))

  done();
});

gulp.task('htmlmin', function (done) {
  return gulp.src('./src/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('dist/'))

  done();
});

gulp.task('move-fonts', function (done) {
  return gulp.src('./src/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))

  done();
});

gulp.task('tinypng', function (done) {
  gulp.src('./src/img/**/*.{png,jpg,jpeg}')
    .pipe(tinyPNG({
      key: 'GzLpC9qHDBQs7DBwrJTgYbzYyBWzxfFN',
    }))
    .pipe(gulp.dest('dist/img/'));
  return gulp.src('./src/img/**/*.svg')
    .pipe(gulp.dest('dist/img/'));

  done();
});

gulp.task('default', gulp.series('minify-css', 'minify-js', 'move-fonts', 'tinypng', 'htmlmin', function (done) {

  done();
}));