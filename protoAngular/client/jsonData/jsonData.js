
angular.module('AngularProtoypeEngine.main.project.jsonData', [])
.config(['$stateProvider', function ($stateProvider) {

  $stateProvider
    .state('AngularProtoypeEngine.main.project.jsonData', {
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
      
      $scope.jsonData = jsonData.jsonData;
      $scope.$parent.projectDatas=$scope.jsonData;
      
      $scope.errorMessage = '';
      $scope.isCollapsed=true;
      $scope.title = '';
      $scope.content = '';
      
      $scope.$watch('selectedData', function() {
        if($scope.selectedData != null){
          $scope.title=$scope.selectedData.title;
        $scope.content=$scope.selectedData.content;
        }
      });
      
      $scope.addJsonData = function(){
        if(!checkField('title')) return;
        
        if(!checkField('content')) return;
        
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
      
      var checkField = function(field) {
        if($scope[field] ==='') { 
          $scope.errorMessage = 'Field ' + field + ' is missing!';
          $scope.isCollapsed=false;
          return false;
        }
        return true;
      };
      
      $scope.show = function(modalData, readOnly){
        var modalInstance = $modal.open({
            templateUrl: 'jsonData/jsonDataModal.tpl.html',
            controller: 'jsonDataModalController',
            resolve: {
              modalData: function () {
                return modalData;
              },
              readOnly: function () {
                return readOnly;
              }
            }
        });
        modalInstance.result.then(function (jsonData) {
          console.log(jsonData);
        });
      };
      
      $scope.removeJsonData = function(index) {
         jsonData.remove(index);
      };
      
      $scope.updateJsonData = function(jsonData, readOnly) {
        $scope.show(jsonData, readOnly);
        // jsonData.update(index);
      }; 
}])
.factory('jsonData',['$http', '$filter', function($http, $filter){
  
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
  o.remove = function(index) {
    console.log("deleting " + o.jsonData[index]._id);
    return $http.delete('/jsonData/'+ o.jsonData[index]._id).success(function(resp){
      o.jsonData.splice(index,1);
      console.log(resp.message);
    });
  };
  o.update = function(index, updatedJsonData) {
    console.log("editing " + o.jsonData[index]._id);
    return $http.put('/jsonData/'+ o.jsonData[index]._id, updatedJsonData).success(function(resp){
      o.jsonData.splice(index,1);
      console.log(resp.message);
    });
  };
  return o;
}]);

angular.module('AngularProtoypeEngine.main.project.jsonData')
.controller('jsonDataModalController', ['$scope', '$modalInstance', 'jsonData', 'modalData', 'readOnly', function ($scope, $modalInstance, jsonData, modalData, readOnly) {

  $scope.title = modalData.title;
  $scope.content = modalData.content;
  $scope.readOnly = readOnly;
  $scope.index = jsonData.jsonData.indexOf(modalData);

  $scope.ok = function () {
    jsonData.jsonData[$scope.index].title = $scope.title;
    jsonData.jsonData[$scope.index].content = $scope.content;
    jsonData.update($scope.index, jsonData.jsonData[$scope.index]);
    $modalInstance.close(jsonData.jsonData[$scope.index]);
  };

}]);
