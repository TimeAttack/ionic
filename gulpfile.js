var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sh = require('shelljs');
var del = require('del');
var minifyCss = require('gulp-minify-css');

var livereload = require('gulp-livereload');
var changed = require('gulp-changed');
var ripple = require('ripple-emulator');
var open = require('open');
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

var paths = {
  'dist': 'www'
};

gulp.task('usemin', function() {
  var reworkCssPipe = rework(
      assets({ src: 'app/components', dest: paths.dist + '/assets', prefix: '../assets/' }),
      reworkSuit());
  var useminPipe = function() {
    return usemin({
      css: [minifyCss(), reworkCssPipe, 'concat'],
      scss: [sass(), reworkCssPipe],
      less: [sourcemaps.init(), less(), sourcemaps.write()],
      html: [minifyHTML({empty: true})],      
      js: [uglify({mangle: false})]
    });
  };

  gulp.src(['app/*.html']).pipe(useminPipe()).pipe(gulp.dest(paths.dist));
  gulp.src(['app/templates/*.html']).pipe(useminPipe()).pipe(gulp.dest(paths.dist + '/templates'));
});

gulp.task('watch', function() {
  gulp.watch('app/**/*{.css, .less, .img, .eot, .svg, .html, .js}', ['usemin']);
});

gulp.task('ripple', ['watch'], function() {
  ripple.emulate.start({ port: 4400 });
  open('http://localhost:4400/?enableripple=cordova-3.0.0');
}); 

gulp.task('clean', function (cb) {
  del([paths.dist], cb);
});

gulp.task('build', ['usemin']);

gulp.task('test', ['build'], function(done) {
  console.log('No tests yet');
  done();
});

gulp.task('default', ['build', 'ripple']);

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
