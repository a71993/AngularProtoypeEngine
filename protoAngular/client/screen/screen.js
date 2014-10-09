angular.module('AngularPrototypeEngine',  ['ui.router'])
  .controller('ScreenController', ['$scope', '$http', '$templateCache',
    function($scope, $http, $templateCache) {
      $scope.method = 'GET';
      $scope.url = '';//gets the link from DB in future

      $scope.fetchHTMLCode = function() {
        $scope.code = null;
        $scope.response = null;

        $http({method: $scope.method, url: $scope.url, cache: $templateCache}).
          success(function(data) {
            $scope.data = data;
          }).
          error(function(data) {
            $scope.data = data || "Request failed";
        });
      };

      $scope.updateModel = function(method, url) {
        $scope.method = method;
        $scope.url = url;
      };
      
      $scope.editData=function(){};
      $scope.previreData=function(){};
      $scope.deleteData=function(){};
      $scope.saveData=function(){};
    }]);