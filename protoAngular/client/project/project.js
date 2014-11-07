(function(angular) {
  "use strict";

angular.module('AngularProtoypeEngine.main.project', ['AngularProtoypeEngine.main.project.components',
'AngularProtoypeEngine.main.project.screen', 'AngularProtoypeEngine.main.project.jsonData', 'ngTable'])
  .config(function ($stateProvider) {
    $stateProvider
      .state('AngularProtoypeEngine.main.project', {
        url: '/project',
        templateUrl: 'project/project.tpl.html',
        controller: 'ProjectController'
      });
    
  })
  .controller('ProjectController', function ($scope, $state) {
    $scope.oneAtATime = true;

    $scope.projectName = "Project1";
    $scope.projectDatas = [];
    $scope.projectComponents = [];
    $scope.projectScreens = [];
    $scope.selectedData = null;
    $scope.selectedComponent = null;
    $scope.selectedScreen = null;

    $scope.template='project/projectInfo.tpl.html';
    
    $scope.setData = function(data) {
      $scope.selectedData = data;
    };
    $scope.setComponent = function(comp) {
      $scope.selectedComponent = comp;
    };
    $scope.setScreen = function(screen) {
      $scope.selectedScreen = screen;
    };

  })
  // .controller('componentMasterController', ['$scope',  '$filter', 'ngTableParams', function ($scope,  $filter, ngTableParams) {
    
  //   var data = [{name: 'Airi Satou', position:'Accountant', office:'Tokyo'},
  //     {name: 'Angelica Ramos', position:'Chief Executive Officer (CEO)', office:'London'},
  //     {name: 'Ashton Cox', position:'Junior Technical Author', office:'San Francisco'},
  //     {name: 'Bradley Greer', position:'Software Engineer', office:'San Francisco'},
  //     {name: 'Gavin Cortez', position:'Support Engineer', office:'London'},
  //     {name: 'Hermione Butler', position:'Regional Director', office:'London'},
  //     {name: 'Airi Satou', position:'Accountant', office:'Tokyo'},
  //     {name: 'Angelica Ramos', position:'Chief Executive Officer (CEO)', office:'London'},
  //     {name: 'Ashton Cox', position:'Junior Technical Author', office:'San Francisco'}
  //     ]; 
      
  //   $scope.tableParams = new ngTableParams({        
  //       page: 1,            
  //       count: 10,          
  //       sorting: {        
  //         name: 'asc'       
  //       }    
  //     }, 
  //     {        
  //       total: data.length,       
  //       getData: function($defer, params) {            
  //         var orderedData = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : data;            
  //         $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));       
  //     }    
      
  //   });
    
      
  //   weekStart: 0;
  //   $scope.today = function() {
  //     $scope.dt = new Date();
  //   };
  //   $scope.today();
  //   $scope.clear = function () {
  //     $scope.dt = null;
  //   };
  //   $scope.open = function($event) {
  //     //$event.preventDefault();
  //     $event.stopPropagation(); 
  //     $scope.opened = true;
  //   };
  //   $scope.dateOptions = {
  //     formatYear: 'yy',
  //     startingDay: 1
  //   };
  //   $scope.format = 'dd-MMMM-yyyy';
    
  //   $scope.status = {
  //     isopen: false
  //   };
  //   $scope.toggleDropdown = function($event) {
  //     $scope.status.isopen = !$scope.status.isopen;
  //   };
  // }]);
 
    
}(angular));
