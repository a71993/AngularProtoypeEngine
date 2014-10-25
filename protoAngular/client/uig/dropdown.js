angular.module('ui.bootstrap.demo', ['ui.bootstrap']);
angular.module('ui.bootstrap.demo').controller('DropdownCtrl', function ($scope) {
  $scope.items = [
    'The first',
    'The second',
    'The third'
  ];

  $scope.status = {
    isopen: false
  };


  $scope.toggleDropdown = function($event) {
   // $event.preventDefault();
   // $event.stopPropagation();
    $scope.status.isopen = !$scope.status.isopen;
  };
});