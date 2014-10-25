angular.module('ui.bootstrap.demo', ['ui.bootstrap']);
angular.module('ui.bootstrap.demo').controller('TabsDemoCtrl', function ($scope) {
  $scope.tabs = [
    { title:' Title 1', content:'Sample content 1' },
    { title:' Title 2', content:'Sample content 2' },
    { title:' Title 3', content:'Sample content 3' },
    { title:' Title 4', content:'Sample content 4' }
  ];

  
  
});