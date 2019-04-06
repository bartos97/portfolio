const gulp =         require('gulp');
const sass =         require('gulp-sass');
const sourcemaps =   require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const wait =         require('gulp-wait');
const watch =        require('gulp-watch');
const terser =       require('gulp-terser');
const concat =       require('gulp-concat');
const browserSync =  require('browser-sync').create();

const jsFiles = [
    "js/lib/jquery-3.3.1.min.js",
    "js/lib/bootstrap.bundle.min.js",
    "js/lib/parallax.min.js",
    "js/lib/jquery.nav.js",
    "js/lib/scrollreveal.min.js",
    "js/main.js"
];


function startServer(callback) {
    browserSync.init({
      notify: false,
      proxy: 'localhost/portfolio',
      // server: {
      //   baseDir: './'
      // }
    });
    callback();
}


function compileSass() {
  return gulp.src('scss/main.scss')
    .pipe(wait(200)) // becouse VS Code was making some problems with compilation on save
    // .pipe(sourcemaps.init())
    .pipe(sass({
        outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer({
        browsers: [ "last 3 versions", "iOS > 7", "Safari > 5", "Explorer >= 11" ]
    }))
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.reload({
        stream: true
    }));
}


function compileJS(){
    return gulp.src(jsFiles)
        .pipe(terser())
            .on('error', err => {
                console.log(err);
            })
        .pipe(concat("main.min.js"))
        .pipe(gulp.dest("js/build"));
}


function watchFiles(callback){
  watch('*.html', browserSync.reload);
  watch('js/*.js', gulp.series(compileJS, browserSync.reload));
  watch('scss/**/*.scss', compileSass);
  callback();
}


// Default task
exports.default = gulp.series(startServer, watchFiles);
exports.js = compileJS;