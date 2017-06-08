var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var colors = require('colors');
var browserSync = require('browser-sync').create();

function logFileChange(event) {
    var fileName = require('path').relative(__dirname, event.path);
    console.log('[' + 'WATCH'.green + '] ' + fileName.magenta + ' was ' + event.event + ', running tasks...');
}

gulp.task('watch', function () {
    ////////////
    //  sass  //
    ////////////
    
    var sassPaths = [
        'scss/**/*.scss', 
    ];

    $.watch(sassPaths, function (v) {
        logFileChange(v);
        gulp.run('sass');
    });

    ///////////
    //  EJS  //
    ///////////
    
    var ejsPaths = [
        'views/**/*.ejs', 
    ];

    $.watch(ejsPaths, function (v) {
        logFileChange(v);
        browserSync.reload();
    });
})

gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: "localhost:8080"
    });
});

gulp.task('sass', function sass() {
    return gulp.src(['scss/base.scss']) 
        // .pipe($.sourcemaps.init()) // uncomment when the package has been updated re: https://github.com/sass/libsass/issues/2312
        .pipe($.sass())
        .on('error', $.notify.onError({ message: "<%= error.message %>", title: "Sass Error" }))
        .pipe($.concat('styles.css'))
        .pipe($.autoprefixer({ browsers: ['last 2 versions', 'ie >= 9'] }))
        .pipe($.minifyCss()) 
        // .pipe( $.sourcemaps.write('.')) 
        .pipe(gulp.dest('public/css'))
        .pipe(browserSync.stream());
});

gulp.task('default', ['browser-sync', 'sass', 'watch'])
