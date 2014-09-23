(function (window, angular, undefined) {

  'use strict';

  angular.module('starter.controllers', [])

    .controller('PageController', function ($scope, $log) {
      $log.info('PageController loaded');

      // TODO: check if there is authentication token in storage. If not, show authentication modal dialog.

      var mapOptions = {
        // TODO: restore previous position?
        center: new google.maps.LatLng(40.435833800555567, -78.44189453125),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoom: 11,
        streetViewControl: false,
        zoomControl: false,
        mapTypeControl: false,
        panControl: false
      };
      var map = new google.maps.Map(document.getElementById("map"), mapOptions);

      var positionListener = function (position) {
        $log.info(position);
        // TODO: pan only if map hasn't been moved for some time
        map.panTo(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
      };
      var positionErrorHandler = function (error) {
        // error.code can be one of:
        // PositionError.PERMISSION_DENIED
        // PositionError.POSITION_UNAVAILABLE
        // PositionError.TIMEOUT
      };
      var geolocationOptions = {enableHighAccuracy: true};
      navigator.geolocation.getCurrentPosition(positionListener, positionErrorHandler, geolocationOptions);
      //navigator.geolocation.watchPosition(positionListener, positionErrorHandler, geolocationOptions);
    })

    .controller('ZeroController', function ($scope, $log) {
      $log.info('Loading ZeroController');

      var $tabs = angular.element(document.getElementById('nav-tabs'));
      $tabs.addClass('transparent');

      $scope.$on('$destroy', function () {
        $log.info('Destroying ZeroController');
        $tabs.removeClass('transparent');
      });
    })

    .controller('AccountCtrl', function ($scope) {
    });

  var openAuthentication = function($log) {
    var scope = 'notify,friends,wall,offline';
    var authURL="https://oauth.vk.com/authorize?client_id=12345&scope="+scope+"&redirect_uri=https://oauth.vk.com/blank.html&display=touch&response_type=token";
    $log.info('About to open VK auth page..');
    var ref = window.open(authURL, '_blank', 'location=yes');
    $log.info('Opened VK auth page');
    ref.addEventListener('exit', function () {
      $log.info('InAppBrowser cancelled by user');
    });
    ref.addEventListener('loadstart', function(event) {
      $log.info('InAppBrowser loadstart: ' + event.url);
      var tmp = event.url.split('#');
      if (tmp[0]=='https://oauth.vk.com/blank.html' || tmp[0]=='http://oauth.vk.com/blank.html') {
        window.alert(tmp[1]);
        ref.close();
      }
    });
  };
})(window, window.angular);
