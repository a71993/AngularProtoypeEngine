(function(angular) {
  "use strict";

  angular.module('AngularProtoypeEngine.main', [
    'AngularProtoypeEngine.main.note', 'AngularProtoypeEngine.main.project', 'AngularProtoypeEngine.main.uig',
    'AngularProtoypeEngine.main.jsonData', 'AngularProtoypeEngine.main.components', 'AngularProtoypeEngine.main.uig.components' ])
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
