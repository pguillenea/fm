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
  }
  
  function employeeService ($http){
  	return {
      get : function() {
  			 return $http.get('/fm2/obtenerFuncionarios');
  		},
  		getSections : function() {
  			 return $http.get('/fm2/obtenerSecciones');
  		},
  		getEmployeesBySection : function(section) {
  			 return $http.get('/fm2/obtenerFuncionarios/' + section);
  		},
  	}
  }

  function sectionCtrl($scope, $mdSidenav, employeeService){
    var self1 = this;
    
    var employee = {
      'nombres' : ''
    }
    
    self1.employee = employee;
    
    employeeService.getSections()
      .success(function(data) {
    	   self1.sections = data;
    });
    
    employeeService.get()
      .success(function(data) {
    	   self1.employees = data;
    });
    
    self1.getEmployeesBySection = function (section){
        var sectionEmpl = [];
        for (var emp in self1.employees) {
          if (self1.employees.hasOwnProperty(emp)) {
            var empleado = self1.employees[emp];
            if (empleado.iddepartamento === section){
              sectionEmpl.push(empleado);  
            }
          }
        }
        self1.sectionEmpl = sectionEmpl;
    }
  }
  
  angular
    .module('employeesApp', ['ngMaterial'])
    .config(config)
    .controller('employeeController', ['$scope', '$mdSidenav', 'employeeService', employeeCtrl])
    .controller('sectionController', ['$scope', '$mdSidenav', 'employeeService', sectionCtrl])
    .service('employeeService', ['$http', employeeService]);
})();
