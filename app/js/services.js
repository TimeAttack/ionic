angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var friends = [
    { id: 0, name: 'Scruff McGruff' },
    { id: 1, name: 'G.I. Joe' },
    { id: 2, name: 'Miss Frizzle' },
    { id: 3, name: 'Ash Ketchum' }
  ];

  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  }
})
.factory('Geolocation', [ 'GeolocationConfig', function Geolocation(cfg) {
	var callbacks = [],
		watchId;
	var fireAllCallbacks = function(position) {
		for(var i=0; i<callbacks.length; ++i) {
			callbacks[i](position);
		}
	};
	return {
		watch: function (callback) {
			if(!watchId) {
				watchId = navigator.geolocation.watchPosition(fireAllCallbacks, function(reason) {
					console.warn('Position update failed', reason);
				}, cfg);
			}
			callbacks.push(callback);
		},
		getCurrent: function (success, error) {
			return navigator.geolocation.getCurrentPosition(success, error);
		},
		removeListener: function (listener) {
			callbacks = _.without(callbacks, listener);
			if(_.isEmpty(callbacks)) {
				navigator.geolocation.clearWatch(watchId);
				watchId = undefined;
			}
		}
	};
}]);

