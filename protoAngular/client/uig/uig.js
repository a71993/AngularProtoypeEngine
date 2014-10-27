var appUig = angular.module('AngularProtoypeEngine.main.uig', ['AngularProtoypeEngine.main.uig.components']);
 // angular.module('AngularProtoypeEngine.main.uig', ['ui.router'])
  appUig.config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('AngularProtoypeEngine.main.uig', {
        url: '/uig',
        templateUrl: 'uig/uig.html',
        controller: 'UigController'
      });
  }])
  appUig.controller('UigController', function ($scope, $state) {
      $scope.oneAtATime = true;

      $scope.groups = [
       {
          title: 'Buttons',
          items: ['Button 1']
        },
        {
          title: 'Tables',
          items: ['Table 1']
        },
        {
          title: 'Tabs',
          items: ['Tab 1', 'Tab 2']
        },
        {
          title: 'Inputs',
          items: ['Input - Big', 'Input - Small']
        },
         {
          title: 'Form',
          items: ['Form ']
        },
        {
          title: 'Date',
          items: ['Date']
        },
        {
          title: 'Menu',
          items: ['Dropdown ']
        }
      ];

      $scope.status = {
        isFirstOpen: true
      };
      
      $scope.selcectedComponent = '';
     // $scope.template = 'uig/uigComponents.tml.html';
     /* 
      $scope.setComponent = function(comp) {
      $scope.selectedComponent = comp;
      console.log($scope.selectedComponent)
        };
      */
      $scope.openComponent = function() {
      $state.go('AngularProtoypeEngine.main.uig.components');
    };
      
  });
 
