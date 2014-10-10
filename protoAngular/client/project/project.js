
angular.module('AngularProtoypeEngine.main.projects.project', [])
  .config(function ($stateProvider) {
    $stateProvider
      .state('AngularProtoypeEngine.main.projects.project', {
        url: '/project',
        templateUrl: 'project/project.tpl.html',
        controller: 'ProjectController'
      });
    
  })
  .controller('ProjectController', function ($scope) {
    $scope.oneAtATime = true;

    $scope.projectDatas = [];
    $scope.projectComponents = [];
    $scope.projectScreens = [];
  
    $scope.addData = function() {};
    $scope.addComponent = function() {};
    $scope.addScreen = function() {};
});