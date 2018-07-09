var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var runSequence = require('run-sequence');
var autoprefixer = require('gulp-autoprefixer');
var wait = require('gulp-wait');


// SASS task
// compiles sass into css
gulp.task('sass', function() {
  return gulp.src('scss/main.scss')
  .pipe(wait(100)) // becouse VS Code was making some problems with compilation on save
  .pipe(sourcemaps.init())
  .pipe(sass({
    outputStyle: 'compressed'
  }).on('error', sass.logError))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('css/'))
  .pipe(browserSync.reload({
    stream: true
  })) 
});

gulp.task('sassLite', function() {
  return gulp.src('scss/main.scss')
  .pipe(sass({
    outputStyle: 'compressed'
  }).on('error', sass.logError))
  .pipe(gulp.dest('css/'))
});


// prefixCss task
gulp.task('prefixCss', function() {
  return gulp.src('css/main.css')
  .pipe(autoprefixer({
    browsers: [ "last 3 versions", "iOS > 7", "Safari > 5", "Explorer >= 11" ]
  }))
  .pipe(gulp.dest('css'));
});


// browserSync task
gulp.task('browserSync', function() {
  browserSync.init({
    notify: false,
    proxy: 'localhost/portfolio',
    // server: {
    //   baseDir: './'
    // }
  });
});


// Watch task
gulp.task('watch', function (){
  gulp.watch(['*.html', 'js/*.js'], browserSync.reload);
  gulp.watch('scss/**/*.scss', ['sass']);
});


// Default task
gulp.task('default', function (callback) {
  runSequence(['browserSync', 'watch'],
    callback
  );
});


// Build CSS task
gulp.task('build-css', function (callback) {
  runSequence(['sassLite', 'prefixCss'],
    callback
  );
});