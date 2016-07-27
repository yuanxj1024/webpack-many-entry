var gulp = require('gulp');
var browser = require('browser-sync');
var rimraf = require('rimraf');
var RevAll = require('gulp-rev-all');
var rename = require('gulp-rename');

var jadeData = require('gulp-data');
var jade = require('gulp-jade');

var browser = require('browser-sync');
var browserSync = browser.create();

var path = {
  jade: './app/src/**/*.jade',
  rev: [
    './app/www/**/*.js',
    './app/www/**/*.css',
    './app/www/**/*.html'
  ],
  html: './test/**/**/index.*.html',
  img: './app/src/**/img/*.*',
  plugins: [
    './app/src/plugins/**/*.*',
    './app/src/custom_plugins/**/*.*'
  ],
  watch: [
    './app/www/**/*.js',
    './app/www/**/*.css',
  ],
  watchImg: [
    './app/www/**/img/*.*',
  ],
  release: [
    './app/src/plugins/**/*.*',
    './app/src/custom_plugins/**/*.*',
    './app/src/**/img/*.*'
  ]
}

gulp.task('clean', function () {
  rimraf.sync('./app/dist');
});

gulp.task('copyPlugins', ['copyImages'], function () {
  return gulp.src(path.plugins, {
      base: './app/src/'
    })
    .pipe(gulp.dest('app/www/'));
});

gulp.task('copyImages', function () {
  return gulp.src(path.img, {
      base: './app/src/'
    })
    .pipe(gulp.dest('app/www/'));
});

gulp.task('server', function () {
  browserSync.init({
    server: './app/www/',
    port: 4000
  });
  // gulp.watch(path.watchImg).on('change', function (file) {
  //   gulp.start('copyImages');
  //   browserSync.reload();
  // });
  gulp.watch(path.watch).on('change', browserSync.reload);
});

// 发布

gulp.task('release', ['clean'], function () {
  return gulp.src(path.release, {
      base: './app/src/'
    })
    .pipe(gulp.dest('app/dist/'));
});

gulp.task('release:dist-img', function () {
  rimraf.sync('./app/dist/img');
});
