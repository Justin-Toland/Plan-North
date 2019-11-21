// Requires
var gulp = require('gulp'),
    babel = require("gulp-babel"),
    sass = require('gulp-sass'),
    terser = require('gulp-terser'), //Uglify for ES6+
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber');

// Scripts Task
gulp.task('scripts', function(){
  gulp.src(['js/**/*.js', '!js/**/*.min.js'])
  .pipe(plumber())
  .pipe(babel({
      presets: ['@babel/env']
  }))
  .pipe(rename({suffix:'.min'}))
  // .pipe(terser()) //Uglify for ES6+
  .pipe(gulp.dest('js'));
})

//Styles task
gulp.task('sass', function () {
  return gulp.src('scss/**/*.scss')
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(rename({suffix:'.min'}))
    .pipe(cleanCSS({compatibility: 'ie8'})) //remove if you want reqular expanded css output.
    .pipe(gulp.dest('css'));
});

//Watch tasks
gulp.task('js:watch', function(){
  gulp.watch('js/**/*.js', ['scripts']);
});

gulp.task('sass:watch', function () {
  gulp.watch('scss/**/*.scss', ['sass']);
});

//Default task
gulp.task('default', ['scripts', 'js:watch', 'sass', 'sass:watch']);
