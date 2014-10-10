(function(angular) {
  "use strict";

  angular.module('AngularProtoypeEngine.main', [
    'AngularProtoypeEngine.main.note', 'AngularProtoypeEngine.main.projects.project', 'AngularProtoypeEngine.main.uig.uig', 'AngularProtoypeEngine.main.jsonData' ])
    .config(function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider
        .when('/AngularProtoypeEngine/main', '/AngularProtoypeEngine/main/notes');
        
      $urlRouterProvider
        .when('/AngularProtoypeEngine/main/projects', '/AngularProtoypeEngine/main/projects/project');
      
      $urlRouterProvider
        .when('/AngularProtoypeEngine/main/uig', '/AngularProtoypeEngine/main/uig/uig'); 

      $stateProvider
        .state('AngularProtoypeEngine.main', {
          url: '/main',
          abstract: false,
          templateUrl: 'main/main.tpl.html'
        });

      $stateProvider
        .state('AngularProtoypeEngine.main.projects', {
          url: '/projects',
          abstract: false,
          templateUrl: ''
        });
        
       
      $stateProvider
        .state('AngularProtoypeEngine.main.uig', {
          url: '/uig',
          abstract: false,
          templateUrl: ''
        });
        
        
    });

}(angular));
