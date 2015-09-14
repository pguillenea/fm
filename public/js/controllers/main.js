angular.module('fm2App', [])

	// inject the Todo service factory into our controller
	.controller('fm2Controller', ['$scope','$http','fm2Service', function($scope, $http, fm2Service) {
		$scope.formData = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		
		fm2Service.get()
			.success(function(data) {
				$scope.faces = data;
			});
	}]);