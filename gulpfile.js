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
var karma = require('karma').server;
var injectReload = require('gulp-inject-reload');
var noop = require('gulp-util').noop;

var paths = {
  'dist': 'www'
};

var useminPipe = function(minify) {
    var reworkCssPipe = rework(
        assets({ src: 'app/components', dest: paths.dist + '/assets', prefix: '../assets/' }),
        reworkSuit());
    var useminPipe = function() {
      return usemin({
        css: [minify ? minifyCss() : noop(), reworkCssPipe, 'concat'],
        scss: [sass(), reworkCssPipe],
        less: [sourcemaps.init(), less(), sourcemaps.write()],
        html: [minify ? minifyHTML({empty: true}) : noop()],
        js: [minify ? uglify({mangle: false}) : noop()]
      });
    };
    return useminPipe();
}

var compile = function(minify, liveReload) {
  gulp.src(['app/*.html'])
    .pipe(liveReload ? injectReload() : noop())
    .pipe(liveReload ? livereload() : noop())
    .pipe(useminPipe(minify))
    .pipe(gulp.dest(paths.dist));
  gulp.src(['app/templates/*.html'])
    .pipe(useminPipe(minify))
    .pipe(liveReload ? livereload() : noop())
    .pipe(gulp.dest(paths.dist + '/templates'));
}

gulp.task('usemin', function() { compile(true, false); });
gulp.task('nomin', function() { compile(false, true); });

gulp.task('watch', function() {
  gulp.watch('app/**/*', ['nomin']);
});

gulp.task('ripple', ['nomin', 'watch'], function() {
  ripple.emulate.start({ port: 4400 });
  open('http://localhost:4400/?enableripple=cordova-3.0.0');
}); 

gulp.task('clean', function (cb) {
  del([paths.dist], cb);
});

gulp.task('build', ['usemin']);

gulp.task('default', ['build', 'ripple']);

gulp.task('install', ['git-check'], function() {
    return bower.commands.install()
        .on('log', function(data) {
            gutil.log('bower', gutil.colors.cyan(data.id), data.message);
        });
});

gulp.task('test', function (done) {
  karma.start({
    configFile: __dirname + '/test/cfg/karma.conf.js',
    singleRun: true
  }, done);
});

gulp.task('tdd', function (done) {
  karma.start({
    configFile: __dirname + '/test/cfg/karma.conf.js'
  }, done);
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
