
angular.module('AngularProtoypeEngine.main.jsonData', [])
.config(['$stateProvider', function ($stateProvider) {

  $stateProvider
    .state('AngularProtoypeEngine.main.jsonData', {
      url: '/jsonData',
      templateUrl: 'jsonData/jsonData.tpl.html',
      resolve: {
        jsonDataPromise: ['jsonData', function(jsonData){
        return jsonData.getAll();
        }]
      },
      controller: 'jsonDataController'
    });
}])
.controller('jsonDataController', ['$scope', '$modal', 'FileUploader', 'jsonData', function ($scope, $modal, FileUploader, jsonData) {
      var uploader = $scope.uploader = new FileUploader({
        url: '/upload'
      });

      uploader.filters.push({
          name: 'jsonFilter',
          fn: function(item /*{File|FileLikeObject}*/, options) {
              var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
              return '|json|'.indexOf(type) !== -1;
          }
      });
      
      $scope.errorMessage = '';
      $scope.jsonData = jsonData.jsonData;
      
      $scope.title = '';
      $scope.content = '';
      $scope.isCollapsed=true;
      
      $scope.addJsonData = function(){
        if($scope.title ==='') { 
          $scope.errorMessage = 'Title is missing!';
          $scope.isCollapsed=false;
          return; 
        }
        if($scope.content ==='') { 
          $scope.errorMessage = 'Content is missing!';
          $scope.isCollapsed=false;
          return; 
        }
        try{
          JSON.parse($scope.content);
        }catch(e){
          console.log("error: "+e);
          $scope.errorMessage = 'Invalid json!';
          $scope.isCollapsed=false;
          return;
        }
        jsonData.create({
          title: $scope.title,
          content: $scope.content
        });
        $scope.title = '';
        $scope.content = '';
        $scope.isCollapsed=true;
        $scope.errorMessage = '';
      };
      
      $scope.show = function(modalData){
        var modalInstance = $modal.open({
            templateUrl: 'jsonData/jsonDataModal.tpl.html',
            controller: 'jsonDataModalController',
            resolve: {
              modalData: function () {
                return modalData;
              }
            }
        });
      };
}])
.factory('jsonData',['$http', function($http){
  // service body
  var o = {
    jsonData: []
  };
  o.getAll = function() {
    return $http.get('/jsonData').success(function(data){
      angular.copy(data, o.jsonData);
    });
  };
  o.create = function(jsonData) {
    return $http.post('/jsonData', jsonData).success(function(data){
      o.jsonData.push(data);
    });
  };
  return o;
}]);

angular.module('AngularProtoypeEngine.main.jsonData').controller('jsonDataModalController', function ($scope, $modalInstance, modalData) {

  $scope.title = modalData.title;
  $scope.content = modalData.content;

  $scope.ok = function () {
    $modalInstance.close();
  };

});