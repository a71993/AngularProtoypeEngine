angular.module('AngularProtoypeEngine.main.jsonData', ['ui.router'])

.config(function ($stateProvider) {

  $stateProvider
    .state('AngularProtoypeEngine.main.jsonData', {
      url: '/jsonData',
      templateUrl: 'jsonData/jsonData.tpl.html',
      controller: 'jsonDataController'
    });
})
.controller('jsonDataController', function ($scope) {
  $scope.message = 'We will upload some json-s!';
  
});
