(function(angular) {
  "use strict";

angular.module('AngularProtoypeEngine.main.uig', ['AngularProtoypeEngine.main.uig.components'])
.config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('AngularProtoypeEngine.main.uig', {
        url: '/uig',
        templateUrl: 'uig/uig.html',
        controller: 'UigController'
      });
  }])
.controller('UigController', function ($scope) {
      $scope.oneAtATime = true;

      $scope.groups = [
       {  title: 'Buttons',
          items: ['Button 1']
        },
        { title: 'Tables',
          items: ['Table 1']
        },
        { title: 'Tabs',
          items: ['Tab 1', 'Tab 2']
        },
        { title: 'Form',
          items: ['Form ']
        },
        { title: 'Date',
          items: ['Date']
        },
        { title: 'Menu',
          items: ['Dropdown ']
        }
      ];

      $scope.status = {
        isFirstOpen: true
      };

   
   
    $scope.proov = "nuppu valik";
    $scope.uigComponents = [];
    $scope.selectedUigComponent = null;
   

  $scope.setUigComponent = function(comp) {
      $scope.selectedUigComponent = comp;
      console.log($scope.selectedUigComponent);
    };


  });


}(angular));