angular.module('ta.create', ['ngResource', 'timer'])

	.controller('CreateTrackController', [ '$http', '$scope', '$log', 'Geolocation' , function ($http, $scope, $log, geolocation) {
		$scope.checkpoints = [];
		var reset = function () {
			$scope.$broadcast('timer-clear');
			$scope.checkpoints = [];
		}
		var record = function(pos) {
			$scope.checkpoints.push({
				lat: pos.coords.latitude,
				lng: pos.coords.longitude,
				time: moment()
			});
		}

		var saved = function() {
			// success popu
		}

		$scope.start = function () {
			reset();
			$scope.$broadcast('timer-start');
			geolocation.watch(record);
		}

		$scope.stop = function() {
			geolocation.removeListener(record);
			$scope.$broadcast('timer-stop');
		}

		$scope.save = function() {
			$http.post('/track', checkpoints).success(reset).success(saved);
		}

		$scope.$on('$destroy', function() {
			geolocation.removeListener(record);
		});

		reset();
		$log.info('CreateTrackController loaded');
	}])

	.filter('numberFixedLen', function () {
		return function(a,b){
			return(1e4+a+"").slice(-b)
		}
	});
