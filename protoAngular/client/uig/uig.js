(function() {
   var app = angular.module('myApp', []);

    app.controller('AccordionsController', '$scope', function ($scope) {
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
        isFirstOpen: true,
     };
  });
});
  
