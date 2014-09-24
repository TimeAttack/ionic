module.exports = function(config) {
  config.set({
    browsers: ['Firefox'],
    frameworks: ['mocha', 'chai'],
    files: [
      '../../app/components/angular/angular.js',
	    '../../app/components/angular-mocks/angular-mocks.js',
	    '../../app/components/angular-timer/dist/angular-timer.js',
      '../../app/components/angular-resource/angular-resource.js',
      '../../app/components/angular-http-auth/src/http-auth-interceptor.js',
      '../../app/components/ionic/js/ionic.bundle.js',
	    '../../app/components/momentjs/moment.js',
      '../../app/js/**/*.js',
      '../**/*.spec.js'
    ],
    client: {
      mocha: {
        ui: 'bdd'
      }
    }
  });
};
