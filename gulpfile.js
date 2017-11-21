'use strict';
// include the required packages.
var gulp = require('gulp'),
    cache = require('gulp-cache'),
    stylus = require('gulp-stylus'),
    livereload = require('gulp-livereload'),
    lr = require('tiny-lr'),
    imagemin = require('gulp-imagemin'),
    connect = require('gulp-connect'),
    plumber = require('gulp-plumber'),
    prefixer = require('autoprefixer-stylus'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    pump = require('pump'),
    cleanCSS = require('gulp-clean-css'),
    browserSync = require('browser-sync'),
    server = lr();
var paths = {
    html : [
        'src/*.html'
    ],
    img: [
      'src/img/*.png',
      'src/img/*.jpg'
    ],
    fonts: [
      'src/fonts/**'
    ],
    scripts: [
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/jquery-ui-dist/jquery-ui.js',
        'node_modules/masonry-layout/dist/masonry.pkgd.min.js',
        'node_modules/jquery-ui-touch-punch/jquery.ui.touch-punch.js',
        'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
        'src/js/*.js'
    ],
    stylus: [
        'src/styles/base/*.styl',
        'src/styles/conteiners/**/*.styl',
        'src/styles/main.styl'
    ],
    css: [
        'node_modules/jquery-ui-dist/jquery-ui.min.css',
        'node_modules/bootstrap/dist/css/bootstrap.css',
        'src/styles/main.styl'
    ]
};
// Options
// Options compress
gulp.task('copy', function() {
    return gulp.src(paths.html)
        .pipe(gulp.dest('build/'))
});

gulp.task('copyFonts', function() {
    return gulp.src(paths.fonts)
        .pipe(gulp.dest('build/fonts/'))
});

gulp.task('js', function (cb) {
    pump([
            gulp.src(paths.scripts),
            plumber(),
            concat('main.js'),
            uglify(),
            gulp.dest('build/js')
        ],
        cb
    );
});


// Call Stylus
gulp.task('stylus', function () {
    return gulp.src(paths.css)
        .pipe(plumber())
        .pipe(stylus({
            use:[prefixer()]
        }))
        .pipe(concat('main.css'))
        .pipe(cleanCSS({debug: true}, function(details) {
            console.log(details.name + ': ' + details.stats.originalSize);
            console.log(details.name + ': ' + details.stats.minifiedSize);
        }))
        .pipe(gulp.dest('build/css/'));
});

// Call Imagemin
gulp.task('imagemin', function () {
    return gulp.src('src/img/*')
        .pipe(plumber())
        .pipe(gulp.dest('build/img'));
});

gulp.task('server', function () {
    var files = [
        'build/**/*.html',
        'build/css/!**!/!*.css',
        'build/img/!**!/!*',
        'build/js/!**/!*.js'
    ];

    browserSync.init(files, {
        server: {
            baseDir: './build/',
            host: 'localhost',
            port: 8080,
            index: 'index.html',
            open: true,
            tunnel: true
        }
    });
});

gulp.task('watch:js',function () {
    gulp.watch(paths.scripts,gulp.parallel('js'));
});
gulp.task('watch:stylus',function () {
    gulp.watch(paths.stylus,gulp.parallel('stylus'));
});
gulp.task('watch:html',function () {
    gulp.watch(paths.html,gulp.parallel('copy'));
});
gulp.task('watch:img',function () {
    gulp.watch(paths.img,gulp.parallel('imagemin'));
});
gulp.task('watch', gulp.parallel('watch:js','watch:stylus','watch:html','watch:img'));

gulp.task('secondary',gulp.parallel('watch', 'stylus','imagemin', 'copy','copyFonts' , 'server'));
gulp.task('default' ,gulp.series('js','secondary'));
