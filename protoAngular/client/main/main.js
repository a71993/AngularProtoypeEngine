(function(angular) {
<<<<<<< HEAD
    "use strict";
angular.module('AngularProtoypeEngine.main', ['ui.router',
    'AngularProtoypeEngine.main.note', 'AngularProtoypeEngine.main.jsonData', 'AngularProtoypeEngine.main.projects.project'
  ])
  .config(function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider
        .when('/AngularProtoypeEngine/main', '/AngularProtoypeEngine/main/notes');

      $urlRouterProvider
        .when('/AngularProtoypeEngine/main/projects', '/AngularProtoypeEngine/main/projects/project');

      $stateProvider
          .state('AngularProtoypeEngine.main', {
            url: '/main',
            abstract: true,
            templateUrl: 'main/main.tpl.html'
          });

      $stateProvider
          .state('AngularProtoypeEngine.main.projects', {
            url: '/projects',
            abstract: false,
            templateUrl: ''
          });
  });
=======
  "use strict";
<<<<<<< HEAD
  angular.module('AngularProtoypeEngine.main', ['ui.router', 'AngularProtoypeEngine.main.note','AngularProtoypeEngine.main.jsonData'])
  .config(function ($stateProvider) {
    $stateProvider
      .state('AngularProtoypeEngine.main', {
        url: '/main',
        abstract: true,
        templateUrl: 'main/main.tpl.html'
      });
  });
=======
  angular.module('AngularProtoypeEngine.main', ['ui.router', 
    'AngularProtoypeEngine.main.note', 'AngularProtoypeEngine.main.projects.project'])
    .config(function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider
        .when('/AngularProtoypeEngine/main', '/AngularProtoypeEngine/main/notes');
        
      $urlRouterProvider
        .when('/AngularProtoypeEngine/main/projects', '/AngularProtoypeEngine/main/projects/project');  

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
        
    });
>>>>>>> da6189cfea3b7ac16e4dbcdf883f5e2a53c1b9fb
>>>>>>> cdb523c0517da60267e2abbcd73bf3a49f5af6ac
}(angular));
