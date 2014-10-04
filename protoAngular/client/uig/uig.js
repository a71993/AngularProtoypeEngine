(function (angular) {
  "use strict";
  angular.module('AngularProtoypeEngine.uig', ['AngularProtoypeEngine.uig'])
  .config(function ($stateProvider) {
    $stateProvider
      .state('AngularProtoypeEngine.uig', {
        url: '/uig',
        abstract: true,
        templateUrl: 'uig/uig.tpl.html'
      });
      
  });
  
angular.module('ui.bootstrap.demo').controller('AccordionDemoCtrl', function ($scope) {
  $scope.oneAtATime = true;

  $scope.groups = [
    {
      title: 'Buttons',
      items: ['Button 1', 'Button 2', 'Button 3']
      
    },
    {
      title: 'Tables',
      items: ['Table 1', 'Table 2', 'Table 3']
    },
     {
      title: 'Tabs',
      items: ['Tab 1', 'Tab 2', 'Tab 3']
    }
  ];



  $scope.status = {
    isFirstOpen: true,
   
  };
});
  
}(angular));