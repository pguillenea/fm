/// <reference path="../../typings/angularjs/angular.d.ts"/>

//To avoid polluting the global namespace, wrap all your functions during compilation/concatenation inside an IIFE
(function (){

  function config ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('light-blue')
      .accentPalette('orange');
  }
  
  function employeeCtrl($scope, $mdSidenav, employeeService){
  	var self = this;
    
    var employee = {
      'name' : '',
      'path' : ''
    }
    
    self.employee = employee;
    
    self.fotos = 'images/NuestrasFotos/';

    $scope.toggleSidenav = function(menuId) {
      $mdSidenav(menuId).toggle();
    };
    
    self.getPath = function(imgName){
      employee.path = self.fotos + imgName + '.JPG';
    }
  
    employeeService.get()
      .success(function(data) {
    	   self.employees = data;
    });
    
    self.editar = function(emp){
      self.employeeEdited = emp;
      employeeService.put(emp)
        .success(function(data){
          console.log ('Funcionario Actualizado! ' + JSON.stringify(data));
        });
    };
  }
  
  function employeeService ($http){
  	return {
  		get : function() {
  			console.log('Obteniendo funcionarios desde el servicio');
  			return $http.get('/fm2/obtenerFuncionarios');
  		},
      put: function(emp){
  			console.log('Actualizando funcionario ' + JSON.stringify(emp));
        var interno = emp.interno ? emp.interno : null;
        var email = emp.email ? emp.email : null;
  			return $http.put('/fm2/actualizarFuncionario/' + emp.id + '/' + interno + '/' + email);
      }
  	}
  }

  angular
    .module('employeesApp', ['ngMaterial'])
    .config(config)
    .controller('employeeController', ['$scope', '$mdSidenav', 'employeeService', employeeCtrl])
    .service('employeeService', ['$http', employeeService]);    
    
})();
