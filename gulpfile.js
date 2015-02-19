var path = require('path');
var fs = require('fs-extra');
var gulp = require('gulp');
var minifycss = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var basePath = 'public/',
    jsAssetsPath = basePath + 'js/assets/',
    cssAssetsPath = basePath + 'css/';
var destPath = basePath + '/App/';

var paths = {
    css : [
        jsAssetsPath +'bootstrap/dist/css/bootstrap.css',
        jsAssetsPath + 'components-font-awesome/css/font-awesome.min.css',
        basePath + 'fonts/style.css',
        cssAssetsPath + 'main.css'
    ],
    jsLibs: [
        jsAssetsPath+'jquery/dist/jquery.min.js',
        jsAssetsPath+'bootstrap/dist/js/bootstrap.min.js',
        jsAssetsPath+'socket.io-client/socket.io.js',
        jsAssetsPath+'angular/angular.min.js',
        jsAssetsPath+'angular-route/angular-route.min.js',
        jsAssetsPath+'angular-sanitize/angular-sanitize.min.js',
        jsAssetsPath+'angular-socket-io/socket.min.js',
        jsAssetsPath+'lodash/lodash.min.js',
        jsAssetsPath+'momentjs/min/moment.min.js',
        jsAssetsPath+'slug/slug.js'
    ],
    jsApp:[
        'public/App/app.js',
        'public/App/Modules/**/*.js',
        'public/App/Services/**/*.js',
        'public/App/Directives/**/*.js',
        'public/App/Filters/**/*.js',
        'public/App/Controllers/**/*.js'
    ],
    htmlPartials : [
        'public/js/App/partials/**/*.html'
    ],
    images: 'client/img/**/*'
};

gulp.task('css', function(done) {
    console.log('Css starting...');
    var minFile = 'styles.min.css';
    var destFile = cssAssetsPath + 'min/' + minFile;
    var stream = gulp.src(paths.css)
        .pipe(concat('styles.min.css'))
        .pipe(minifycss())
        .pipe(gulp.dest(cssAssetsPath + 'min'))
        .on('error',function(e){
            console.error(e)
        });


});


gulp.task('jsLibs', function(done) {
    // Minify and copy all JavaScript (except vendor js)
    console.log('All js ...');
    var minDestPath = 'public/js/min/';
    var minFile = 'libs.min.js';
    var destFile =  minDestPath + minFile;
    var stream = gulp.src(paths.jsLibs)
        .pipe(concat(minFile))
        .pipe(gulp.dest(minDestPath))
        .on('error',function(e){
            console.error(e)
        });

});

gulp.task('jsApp', function(done) {
    // Minify and copy all JavaScript (except vendor js)
    console.log('App js ...');
    var minDestPath = 'public/js/min/';
    var minFile = 'app.min.js';
    var destFile =  minDestPath + minFile;

    var stream = gulp.src(paths.jsApp)
        .pipe(concat(minFile))
        .pipe(gulp.dest(minDestPath))
        .on('error',function(e){
            console.error(e)
        });

    stream.on('end', function() {
        done();
    });
});

gulp.task('angularPartials', function(done) {

    console.log('Partials ...');

    fs.copy('public/js/App/partials',destPath + 'js/App/partials');
    console.log(destPath + 'js/App')
    done();
});


gulp.task('watch', function() {

    gulp.watch(paths.css, ['css']);

    gulp.watch(paths.jsLibs, ['jsLibs']);
    gulp.watch(paths.jsApp, ['jsApp']);

    console.log('watching ..');

});

gulp.task('default', ['jsLibs','css','jsApp','watch']);

