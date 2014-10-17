
angular.module('AngularProtoypeEngine.main.project', [])
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

    $scope.projectDatas = [];
    $scope.projectComponents = [];
    $scope.projectScreens = [];
  
    $scope.addData = function() {
      $state.go('AngularProtoypeEngine.main.jsonData');
    };
    $scope.addComponent = function() {};
    $scope.addScreen = function() {};
});