var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    stylus = require('gulp-stylus'),
    concat = require('gulp-concat-util'),
    minifyCSS = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    prettify = require('gulp-js-prettify'),

    header = ";(function() {\n\n",
    footer = "\n\n}.call(this));";

gulp.task('css', function () {
  gulp.src( [
    './src/styl/ream.styl',
  ])
    .pipe(plumber())
    .pipe(stylus())
    .pipe(gulp.dest('./dist/'))
    .pipe(rename('ream.min.css'))
    .pipe(minifyCSS({keepBreaks:false}))
    .pipe(gulp.dest('./dist/'))
});

gulp.task('js', function() {
  gulp.src( [
    './src/js/ream.js',
  ])
    .pipe(plumber())
    .pipe(concat.header(header))
    .pipe(concat.footer(footer))
    .pipe(gulp.dest('./dist/'))
    .pipe(rename('ream.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'))
})

gulp.task('dev', function() {
  gulp.watch('./src/styl/*', ['css']);
  gulp.watch('./src/js/*', ['js']);
});

gulp.task('prettify', function() {
  gulp.src('./src/js/ream.js')
    .pipe(prettify({collapseWhitespace: true}))
    .pipe(gulp.dest('./src/js/'))
});