const gulp = require('gulp')
const less = require('gulp-less')
const sass = require('gulp-sass')(require('sass'))
const minifyCSS = require('gulp-csso')
const minifyJS = require('gulp-uglify')
const concat = require('gulp-concat')

gulp.src('server/assets/sass/application.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(less())
  .pipe(minifyCSS())
  .pipe(gulp.dest('public/stylesheets'))

gulp.src('server/assets/js/*.js')
  .pipe(gulp.dest('public/javascripts'))

gulp.src('node_modules/bootstrap/dist/css/*.css')
  .pipe(concat('bootstrap.css'))
  .pipe(minifyCSS())
  .pipe(gulp.dest('public/stylesheets'))

gulp.src('node_modules/bootstrap/dist/js/*.js')
  .pipe(concat('bootstrap.js'))
  .pipe(minifyJS())
  .pipe(gulp.dest('public/javascripts'))

gulp.src('node_modules/font-awesome/fonts/**')
  .pipe(gulp.dest('public/fonts'))

gulp.src('node_modules/font-awesome/css/*.css')
  .pipe(less())
  .pipe(minifyCSS())
  .pipe(gulp.dest('public/stylesheets'))