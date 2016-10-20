var gulp = require('gulp'),
    gutil = require('gulp-util'),
    nodemon = require('gulp-nodemon'),
    jade = require('gulp-jade'),
    sass = require('gulp-sass'),
    cleanCss = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    livereload = require('gulp-livereload'),
    minifyHtml = require('gulp-htmlmin')
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean'),
    bower = require('gulp-bower');


var paths = {
  client: ['client/**/*.*'],
  jade: ['client/*.jade','client/**/*.jade'],
  sass: ['client/**/*.sass', 'client/*.sass'],
  scripts: ['client/*.js', 'client/**/*.js'],
};

gulp.task('jade', function(){
  gulp.src(paths.jade)
      .pipe(jade())
      .pipe(minifyHtml())
      .pipe(gulp.dest('public'));
});

gulp.task('sass', function(){
  gulp.src(paths.sass)
      .pipe(sass())
      .pipe(cleanCss())
      .pipe(concat('combinedStyles.css'))
      .pipe(gulp.dest('public/styles'));
})

gulp.task('scripts', function(){
  gulp.src(paths.scripts)
      .pipe(concat('build.js'))
      .pipe(gulp.dest('public'));
});

gulp.task('browserify', function(){
  gulp.src('build.js')
      .pipe(browserify())
      .pipe(gulp.dest('public'));
});

gulp.task('nodemon', function(){

  //load environment variables
  require('dotenv').config();

  nodemon({
    script: 'server.js',
    ext: 'js'
  });
});

gulp.task('watch', function(){
  gulp.watch(paths.jade, ['jade']);
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.scripts, ['scripts', 'browserify']);
});

gulp.task('build', ['jade', 'sass', 'scripts', 'browserify']);

gulp.task('default', ['nodemon', 'build', 'watch']);