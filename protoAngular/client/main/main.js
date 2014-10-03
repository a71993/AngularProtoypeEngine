(function (angular) {
  "use strict";
  angular.module('AngularProtoypeEngine.main', ['ui.router', 'AngularProtoypeEngine.main.note'])
  .config(function ($stateProvider) {
    $stateProvider
      .state('AngularProtoypeEngine.main', {
        url: '/main',
        abstract: true,
        templateUrl: 'main/main.tpl.html'
      });
  });
}(angular));
