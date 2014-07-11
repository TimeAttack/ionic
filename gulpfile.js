var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sh = require('shelljs');
var minifyCss = require('gulp-minify-css');

var livereload = require('gulp-livereload');
var changed = require('gulp-changed');
var ripple = require('ripple-emulator');
var open = require('open');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var usemin = require('gulp-usemin');
var sourcemaps = require('gulp-sourcemaps');
var less = require('gulp-less');
var minifyHTML = require('gulp-minify-html');
var imagemin = require('gulp-imagemin');

gulp.task('usemin', function() {
  gulp.src('app/*.html')
    .pipe(usemin({
      css: [minifyCss(), 'concat'],
      scss: [sass()],
      less: [sourcemaps.init(), less(), sourcemaps.write()],
      html: [minifyHTML({empty: true})],
      js: [uglify()]
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('fonts', function() { return gulp.src('app/**/{*.eot, *.ttf, *.woff}', {base: "app"}).pipe(gulp.dest('dist')); });
gulp.task('configs', function() { return gulp.src('app/*.xml', {base: "app"}).pipe(gulp.dest('dist')); });
gulp.task('images', function() {
  return gulp.src('app/**/{*.png, *.svg, *.img, .*.ico}', {base: "app"})
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  gulp.watch('app/img/**/*', ['images']);
  gulp.watch('app/img/components/**/*', ['images', 'fonts']);
});

gulp.task('server', ['watch'], function() { 
  ripple.emulate.start({ port: 4400 }); 
  open('http://localhost:4400/app/?enableripple=cordova-3.0.0');
}); 

gulp.task('server-dist', function() { 
  ripple.emulate.start({ port: 4500 }); 
  open('http://localhost:4500/dist/?enableripple=cordova-3.0.0');
});

gulp.task('clean', function () {
    return gulp.src('dist', {read: false}).pipe(clean());
});

gulp.task('build', ['images', 'fonts', 'configs', 'usemin']);

gulp.task('default', ['build', 'server-dist']);

gulp.task('install', ['git-check'], function() {
    return bower.commands.install()
        .on('log', function(data) {
            gutil.log('bower', gutil.colors.cyan(data.id), data.message);
        });
});

gulp.task('git-check', function(done) {
    if (!sh.which('git')) {
        console.log(
            '  ' + gutil.colors.red('Git is not installed.'),
            '\n  Git, the version control system, is required to download Ionic.',
            '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
            '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
        );
        process.exit(1);
    }
    done();
});
