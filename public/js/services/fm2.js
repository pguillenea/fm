angular.module('fm2Service', [])

	.factory('fm2Factory', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/fm2');
			}
		}
	}]);