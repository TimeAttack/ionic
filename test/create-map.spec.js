describe('Create Map Controller', function () {

	beforeEach(module('ta.create'));
	var CreateMapCtrl,
		scope;
	beforeEach(inject(function ($controller, $rootScope, $log) {
		scope = $rootScope.$new();
		CreateMapCtrl = $controller('CreateTrackController', {
			$scope: scope,
			$http: {},
			$log: $log,
			Geolocation: {
				watch: function (callback) {
					callback({
						coords: {longitude: 30.612803, latitude: 59.736637}
					})},
				removeListener: function() {}
			}
		});
	}));

	it('should collect user coordinates when track recording started', function () {
		scope.start();
		scope.stop();
		scope.checkpoints.length.should.equal(1);
	});

	it('should forget all checkpoints after restart', function () {
		scope.start();
		scope.stop();
		scope.checkpoints.length.should.equal(1);
		scope.start();
		scope.stop();
		scope.checkpoints.length.should.equal(1);
	});

	it('should log checkpoints time', function() {
		scope.start();
		scope.stop();
		expect(scope.checkpoints[0].time).not.undefined;
	})
})

