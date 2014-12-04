(function (angular) {
  'use strict';
  angular.module('AngularProtoypeEngine', [
    'ui.bootstrap',
      'ngRoute',
      'ui.router',
    'angularFileUpload',
  'AngularProtoypeEngine.vaade',
  'AngularProtoypeEngine.main', 
  'AngularProtoypeEngine.main.project.screen'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider
    .when('/AngularProtoypeEngine/t', '/AngularProtoypeEngine/main/vaade')
    .otherwise('/AngularProtoypeEngine/main/notes');

    $stateProvider
      .state('AngularProtoypeEngine', {
        url: '/AngularProtoypeEngine',
        abstract: true,
        template: '<ui-view></ui-view>'
      });
  });
}(angular));



