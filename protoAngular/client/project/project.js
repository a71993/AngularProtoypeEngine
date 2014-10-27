(function(angular) {
  "use strict";

angular.module('AngularProtoypeEngine.main.project', ['AngularProtoypeEngine.main.project.components'])
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
    $scope.selectedComponent = '';
    
    $scope.template='project/projectInfo.tpl.html';
  
    $scope.addData = function() {
      $state.go('AngularProtoypeEngine.main.jsonData');
    };
    $scope.setComponent = function(comp) {
      $scope.selectedComponent = comp;
      console.log($scope.selectedComponent)
    };
    $scope.addScreen = function() {};
});

}(angular));