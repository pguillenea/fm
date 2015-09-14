/// <reference path="../../typings/angularjs/angular.d.ts"/>

(function(){
	
	window.onscroll = myFunction;
	
	function myFunction() {
		if (document.body.scrollTop > 300) {
			document.getElementById("flotador").className = "c1";
		} else {
			document.getElementById("flotador").className = "";
		}
	}
  	
	function config ($mdThemingProvider) {
    	$mdThemingProvider.theme('default')
      		.primaryPalette('light-blue')
      		.accentPalette('orange');
	}

	function appCrtl ($scope){
		$scope.title = 'Pablo';
	}
	
	angular
		.module('mdApp', ['ngMaterial'])
		.config(config)
		.controller('AppCtrl', ['$scope', appCrtl])
		;
})();