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
          items: [{title:'Button 1' }]
        /*HTMLcontent: '<div class="btn-group">\n\t<label class="btn btn-primary" ng-model="radioModel" btn-radio="\'Left\'">\n\t\tLeft\n\t</label> \n\t<label class="btn btn-primary" ng-model="radioModel" btn-radio="\'Middle\'">\n\t\tMiddle\n\t</label> \n\t<label class="btn btn-primary" ng-model="radioModel" btn-radio="\'Right\'">\n\t\tRight\n\t</label>\n</div>'*/
        },
        { title: 'Tables',
          items: [{title:'Table 1'}]
        },
        { title: 'Tabs',
          items: [{title:'Tab 1'}, {title:'Tab 2'}]
        },
        { title: 'Form',
          items: [{title:'Form'}]
        },
        { title: 'Date',
          items: [{title:'DatePicker'}]
        },
        { title: 'Menu',
          items: [{title:'Dropdown'}]
        }
      ];

      $scope.status = {
        isFirstOpen: true
      };

   
   
   
    $scope.uigComponents = [];
    $scope.selectedUigComponent = null;
   
    $scope.setUigComponent = function(comp) { 
      $scope.selectedUigComponent = comp;
      console.log($scope.selectedUigComponent);
    };


  });


}(angular));