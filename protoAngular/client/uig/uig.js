
  angular.module('AngularProtoypeEngine.main.uig.uig', ['ui.bootstrap']);

  angular.module('AngularProtoypeEngine.main.uig.uig', ['ui.router'])
  .config(function ($stateProvider) {
    $stateProvider
      .state('AngularProtoypeEngine.main.uig.templates', {
        url: '/uig',
        templateUrl: 'uig/uig.html',
        controller: 'UigController'
      });
  })
  .controller('UigController', function ($scope) {
      $scope.oneAtATime = true;

      $scope.groups = [
         {
          title: 'Buttons',
          items: ['Button 1', 'Button 2']
      
          },
        {
          title: 'Tables',
          items: ['Table 1', 'Table 2']
        },
        {
          title: 'Tabs',
          items: ['Tab 1', 'Tab 2']
        }
      ];

      $scope.status = {
        isFirstOpen: true
      };
      
  });

  
