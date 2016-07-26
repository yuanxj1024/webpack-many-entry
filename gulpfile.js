var gulp = require('gulp');
var browser = require('browser-sync');
var rimraf = require('rimraf');
var RevAll = require('gulp-rev-all');
var rename = require('gulp-rename');

var jadeData = require('gulp-data');
var jade = require('gulp-jade');


var path = {
  jade: './app/src/**/*.jade',
  rev: [
    './app/www/**/*.js',
    './app/www/**/*.css',
    './app/www/**/*.html'
  ],
  html: './test/**/**/index.*.html'
}


gulp.task('clean', function () {
  rimraf.sync('./app/www');
});

var rev = new RevAll();


gulp.task('rename',function () {
  return gulp.src(path.html)
    .pipe(rename('index.html'))
    .pipe(gulp.dest('./rename/'));
});

// 编译jade
gulp.task('build:jade', function () {
  return gulp.src(path.jade, {
      base: './app/src/'
    })
    .pipe(jadeData(function (file) {
      return require('./app/global.config.json');
    }))
    .pipe(jade())
    .pipe(gulp.dest('./app/www/'));
});

gulp.task('release', function () {
  return gulp.src(path.rev)
    .pipe(rev.revision())
    .pipe(gulp.dest('test'));
});
