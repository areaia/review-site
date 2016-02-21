var gulp = require('gulp');
var $    = require('gulp-load-plugins')();
var browserSync = require("browser-sync");

// browserSyncのリロード
var reload  = browserSync.reload;

var sassPaths = [
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];

gulp.task('sass', function() {
  return gulp.src('scss/app.scss')
    .pipe($.sass({
      includePaths: sassPaths
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('css/'));
});

// browserSync ルートはdest
gulp.task("browserSync", function () {
   browserSync.init({
       server: {
           baseDir: "./" // ルートとなるディレクトリを指定
       }
   });
});

gulp.task("watch",function(){
   gulp.watch('scss/**/*.scss', ['sass']),
   gulp.watch(['**/*.html',　'**/*.css'], reload);
});

gulp.task("default",["watch", "browserSync"])