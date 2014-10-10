(function (angular) {
  'use strict';
  angular.module('AngularProtoypeEngine', [
    'ui.router',
    'ui.bootstrap',
    'angularFileUpload',
  'AngularProtoypeEngine.main'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/AngularProtoypeEngine/main/notes');

    $stateProvider
      .state('AngularProtoypeEngine', {
        url: '/AngularProtoypeEngine',
        abstract: true,
        template: '<ui-view></ui-view>'
      });
  });
}(angular));



