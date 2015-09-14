/// <reference path="../../typings/angularjs/angular.d.ts"/>
(function(){
	function pabCtrl($scope, pabService){
		var self = this;
		self.pp = [];
		
		pabService.get()
		.success(function(data) {
			self.pp = data;
		});
	}

	function pabService($http){
		return {
			get : function() {
				console.log('Obteniendo funcionarios desde el servicio');
				return $http.get('/fm2/obtenerFuncionarios');
			}
		}
	}
	
	function amdCtrl($scope){
      $scope.user = {
          name : ''
        };
    }
	
	angular
		.module('pabApp', [])
		.controller('pabController', ['$scope', 'pabService', pabCtrl])
		.service('pabService', ['$http', pabService]);
	
	angular
		.module('amdApp', ['ngMaterial', 'ngMessages'])
		.controller('amdController', ['$scope', amdCtrl]);
	
})();
