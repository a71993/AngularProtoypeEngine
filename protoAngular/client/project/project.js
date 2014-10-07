<<<<<<< HEAD

angular.module('AngularProtoypeEngine.main.projects.project', ['ui.router','ui.bootstrap'])
=======
angular.module('AngularProtoypeEngine.main.projects.project', ['ui.bootstrap']);

angular.module('AngularProtoypeEngine.main.projects.project', ['ui.router'])
>>>>>>> cdb523c0517da60267e2abbcd73bf3a49f5af6ac
  .config(function ($stateProvider) {
    $stateProvider
      .state('AngularProtoypeEngine.main.projects.project', {
        url: '/project',
        templateUrl: 'project/project.tpl.html',
        controller: 'ProjectController'
      });
<<<<<<< HEAD
    
=======
>>>>>>> cdb523c0517da60267e2abbcd73bf3a49f5af6ac
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