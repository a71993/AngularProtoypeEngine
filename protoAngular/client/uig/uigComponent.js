angular.module('AngularProtoypeEngine.main.uig.components', ['ui.router'])
.config(function ($stateProvider) {
  $stateProvider
        .state('AngularProtoypeEngine.main.uig.components', {
        url: '/components',
        templateUrl: '/uig/uigComponents.tpl.html',
        controller: 'UigComponentsCtrl'
      });
  })
.controller('UigComponentsCtrl', function ($scope) { 

      /*
      $scope.uigComponent = uigComponent.uigComponent;
      $scope.$parent.uigComponents = $scope.uigComponent;
      
      $scope.errorMessage = '';
      $scope.isCollapsed=true;
      $scope.title = '';
      $scope.HTMLcontent = '';
      $scope.controller = '';
    */

});