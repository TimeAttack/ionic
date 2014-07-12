angular.module('starter.controllers', [])

    .controller('PageController', function($scope, $log) {
        $log.info('PageController loaded');

        var mapOptions = {
            center: new google.maps.LatLng(40.435833800555567, -78.44189453125),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoom: 11,
            streetViewControl: false,
            zoomControl: false,
            mapTypeControl: false,
            panControl: false
        };
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    })

    .controller('ZeroController', function($scope, $log) {
        $log.info('Loading ZeroController');

        var $tabs = angular.element(document.getElementById('nav-tabs'));
        $tabs.addClass('transparent');

        $scope.$on('$destroy', function() {
            $log.info('Destroying ZeroController');
            $tabs.removeClass('transparent');
        });
    })

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
});
