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
var rework = require('gulp-rework');
var assets = require('rework-assets');
var reworkSuit = require('rework-suit');

gulp.task('usemin', function() {
  var reworCssPipe = rework(
      assets({ src: 'app/components', dest: 'dist/assets', prefix: '../assets/' }),
      reworkSuit());
  var useminPipe = function() {
    return usemin({
      css: [minifyCss(), reworCssPipe, 'concat'],
      scss: [sass(), reworCssPipe],
      less: [sourcemaps.init(), less(), sourcemaps.write()],
      html: [minifyHTML({empty: true})],      
      js: [uglify({mangle: false})]
    });
  };

  gulp.src(['app/*.html']).pipe(useminPipe()).pipe(gulp.dest('dist/'));
  gulp.src(['app/templates/*.html']).pipe(useminPipe()).pipe(gulp.dest('dist/templates'));    
});

gulp.task('configs', function() { return gulp.src('app/*.xml', {base: "app"}).pipe(gulp.dest('dist')); });

gulp.task('watch', function() {
  gulp.watch('app/**/*{.css, .less, .img, .eot, .svg, .html, .js}', ['usemin']);
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

gulp.task('build', ['configs', 'usemin']);

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
