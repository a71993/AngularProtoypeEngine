var appUig = angular.module('AngularProtoypeEngine.main.uig', ['ui.router']);
 // angular.module('AngularProtoypeEngine.main.uig', ['ui.router'])
  appUig.config(function ($stateProvider) {
    $stateProvider
      .state('AngularProtoypeEngine.main.uig', {
        url: '/uig',
        templateUrl: 'uig/uig.html',
        controller: 'UigController'
      });
  })
  appUig.controller('UigController', function ($scope) {
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
      
  });

  
  appUig.directive("buttonOne", function() {
    return {
      restrict: "E",
      templateUrl: "uig/button1.html",
      controller: function($scope) {
       

     $scope.radioModel = 'Middle';
    /*
      $scope.checkModel = {
      left: false,
      middle: true,
      right: false
    };*/},
      controllerAs: "button1C"
    };
  });

  
