(function(angular) {
  "use strict";

  angular.module('AngularProtoypeEngine.main', [
    'AngularProtoypeEngine.main.note', 'AngularProtoypeEngine.main.project', 'AngularProtoypeEngine.main.uig',
    'AngularProtoypeEngine.main.project.jsonData', 'AngularProtoypeEngine.main.project.components','AngularProtoypeEngine.main.project.screen', 'AngularProtoypeEngine.main.project.vaade'])
    .config(function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider
        .when('/AngularProtoypeEngine/main', '/AngularProtoypeEngine/main/notes');

      $stateProvider
        .state('AngularProtoypeEngine.main', {
          url: '/main',
          abstract: false,
          templateUrl: 'main/main.tpl.html'
        });

    });

}(angular));
