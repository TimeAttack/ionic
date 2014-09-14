(function(window, angular, undefined) {

  'use strict';

  angular.module('timeattack.auth', ['http-auth-interceptor'])
    .factory('AuthenticationService', function($rootScope, $http, authService, $httpBackend) {
      var service = {

      };
      return service;
    })
})(window, window.angular);
