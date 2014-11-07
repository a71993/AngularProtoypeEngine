
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
.controller('jsonDataController', ['$scope', '$modal', '$window','FileUploader', 'jsonData', function ($scope, $modal, $window, FileUploader, jsonData) {
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
      $scope.successMessage = '';
      $scope.isCollapsed = true;
      $scope.successAlertIsCollapsed = true;
      $scope.title = '';
      $scope.content = '';
      
      $scope.$watch('selectedData', function() {
        if($scope.selectedData!=null && $scope.selectedData!==''){
          $scope.title=$scope.selectedData.title;
          $scope.content=$scope.selectedData.content;
        }else{
          $scope.title='';
          $scope.content='';
        }  
        $scope.setAlerts('', true, '', true);
      });
      
      $scope.$watch('jsonData', function() {
          for(var i = $scope.jsonData.length-1; i >= 0; i--){
            if($scope.title === $scope.jsonData[i].title){
              $scope.$parent.selectedData = $scope.jsonData[i];
              break;
            }
        }
      }, true);
      
      $scope.addJsonData = function(){
        if(!checkField('title')) return;
        
        if(!checkField('content')) return;
        
        try{
          JSON.parse($scope.content);
        }catch(e){
          console.log("error: "+e);
          $scope.setAlerts('Invalid json!', false, '', true);
          return;
        }
        jsonData.create({
          title: $scope.title,
          content: $scope.content
        });
        $scope.setAlerts('', true, 'Successfully created', false);
      };
      
      var checkField = function(field) {
        if($scope[field] ==='') { 
          $scope.setAlerts('Field ' + field + ' is missing!', false, '', true);
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
      
      $scope.removeJsonData = function() {
        jsonData.remove($scope.selectedData);
        $scope.$parent.selectedData=null;
        $scope.setAlerts('', true, '', true);
      };
      
      $scope.updateJsonData = function() {
        if(!checkField('title')) return;
        
        if(!checkField('content')) return;
        
        $scope.$parent.selectedData.title=$scope.title;
        $scope.$parent.selectedData.content=$scope.content;
        jsonData.update($scope.selectedData);
        
        $scope.setAlerts('', true,  "Successfully updated " + $scope.selectedComponent.title, false);
      }; 
      
        
      // $scope.updateJsonData = function(jsonData, readOnly) {
      //   $scope.show(jsonData, readOnly);
      // }; 
      
      $scope.downloadJsonData = function(){
        var blob = new Blob([ $scope.content ], { type : 'application/json' });
        $scope.downloadUrl = (window.URL || window.webkitURL).createObjectURL( blob );
        $window.location.href = $scope.downloadUrl;
      };
            
      $scope.newJsonDataSelected = function() {
        if($scope.selectedData !== null && $scope.selectedData === ''){
          return true;
        }else{
          return false;
        }
      };
      
      $scope.setAlerts = function(errorMessage, errorCollapsed, successMessage, successCollapsed){
        if(errorMessage !== null){
          $scope.errorMessage = errorMessage;
        }
        if(successMessage !== null){
          $scope.successMessage = successMessage;
        }
        if(errorCollapsed !== null){
          $scope.isCollapsed = errorCollapsed;
        }
        if(successCollapsed !== null){
          $scope.successAlertIsCollapsed = successCollapsed;
        }
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
    o.remove = function(jsonData) {
    console.log("deleting " + jsonData._id);
    return $http.delete('/jsonData/'+ jsonData._id).success(function(resp){
      o.jsonData.splice(o.jsonData.indexOf(jsonData),1);
      console.log(resp.message);
    });
  };
  o.update = function(updatedJsonData) {
    return $http.put('/jsonData/'+ updatedJsonData._id, updatedJsonData).success(function(resp){
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
