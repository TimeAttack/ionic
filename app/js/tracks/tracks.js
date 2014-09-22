(function (window, angular, undefined) {

  'use strict';

  angular.module('ta.tracks', ['ngResource'])

    .controller('TracksController', function ($scope, $log, Tracks) {
      $log.info('Loading TracksController');

      $scope.$on('$destroy', function () {
        $log.info('Destroying TracksController');
      });

      var mapOptions = {
        // TODO: get last position?
        center: new google.maps.LatLng(40.435833800555567, -78.44189453125),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoom: 11,
        streetViewControl: false,
        zoomControl: false,
        mapTypeControl: false,
        panControl: false
      };
      var map = new google.maps.Map(document.getElementById("tracks-search-map"), mapOptions);

      var positionListener = function (position) {
        $log.info('[TracksController] Got current position');
        $scope.$apply(function () {
          $log.info('[TracksController] Navigating map to current position');
          map.panTo(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));

          var bbox = map.getBounds();
          $scope.tracks = Tracks.search({
            swLat: bbox.getSouthWest().lat(),
            swLng: bbox.getSouthWest().lng(),
            neLat: bbox.getNorthEast().lat(),
            neLng: bbox.getNorthEast().lng()
          });
        });
      };
      var positionErrorHandler = function (error) {
        $log.error("[TracksController] can't get position", error.message);
        // error.code can be one of:
        // PositionError.PERMISSION_DENIED
        // PositionError.POSITION_UNAVAILABLE
        // PositionError.TIMEOUT
      };
      var geolocationOptions = {enableHighAccuracy: true};
      navigator.geolocation.getCurrentPosition(positionListener, positionErrorHandler, geolocationOptions);

      $log.info('TracksController loaded');
    })

    .controller('TrackDetailCtrl', function ($scope, $log, $stateParams, Tracks) {
      $log.info('Initializing TrackDetailCtrl');

      $scope.$on('$destroy', function () {
        $log.info('Destroying TrackDetailCtrl');
      });

      $scope.tack = Tracks.get($stateParams.trackId);

      $log.info('TrackDetailCtrl initialized');
    })

    .factory('Tracks', function ($resource) {
      return $resource('http://api.tapcat.net/track/:id', {}, {
        search: {
          url: 'http://api.tapcat.net/search/track/:swLat;:swLng;:neLat;:neLng',
          method: 'GET',
          isArray: true
        }
      });
    });

})(window, window.angular);
