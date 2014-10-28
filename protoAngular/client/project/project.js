(function(angular) {
  "use strict";

angular.module('AngularProtoypeEngine.main.project', ['AngularProtoypeEngine.main.project.components','AngularProtoypeEngine.main.project.screen', 'AngularProtoypeEngine.main.project.jsonData'])
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
      console.log($scope.selectedData);
    };
    $scope.setComponent = function(comp) {
      $scope.selectedComponent = comp;
      console.log($scope.selectedComponent);
    };
    $scope.setScreen = function(screen) {
      $scope.selectedScreen = screen;
      console.log($scope.selectedScreen);
    };


});


}(angular));
