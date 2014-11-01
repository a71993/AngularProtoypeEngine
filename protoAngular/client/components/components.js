
angular.module('AngularProtoypeEngine.main.project.components', [])
.config(['$stateProvider', function ($stateProvider) {

  $stateProvider
    .state('AngularProtoypeEngine.main.project.components', {
      url: '/components',
      templateUrl: 'components/components.tpl.html',
      resolve: {
        uiComponentPromise: ['uiComponent', function(uiComponent){
        return uiComponent.getAll();
        }]
      },
      controller: 'componentsController'
    });
}])
.controller('componentsController', ['$scope', '$modal', 'FileUploader', 'uiComponent', function ($scope, $modal, FileUploader, uiComponent) {


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
      
      $scope.uiComponent = uiComponent.uiComponent;
      $scope.$parent.projectComponents = $scope.uiComponent;
      
      $scope.errorMessage = '';
      $scope.isCollapsed=true;
      $scope.title = '';
      $scope.HTMLcontent = '';
      
      $scope.$watch('selectedComponent', function() {
        if($scope.selectedComponent!=null && $scope.selectedComponent!==''){
          $scope.title=$scope.selectedComponent.title;
          $scope.HTMLcontent=$scope.selectedComponent.HTMLcontent;
        }else{
          $scope.title='';
          $scope.HTMLcontent='';
        }  
      });
      
      $scope.$watch('uiComponent', function() {
          for(var i = $scope.uiComponent.length-1; i >= 0; i--){
            if($scope.title === $scope.uiComponent[i].title){
              $scope.$parent.selectedComponent = $scope.uiComponent[i];
              break;
            }
        }
      }, true);

      $scope.addComponent = function(){
        if(!checkField('title')) return;
        
        if(!checkField('HTMLcontent')) return;

        uiComponent.create({
          title: $scope.title,
          HTMLcontent: $scope.HTMLcontent
        });
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
            templateUrl: 'components/componentsModal.tpl.html',
            controller: 'componentsModalController',
            resolve: {
              modalData: function () {
                return modalData;
              },
              readOnly: function () {
                return readOnly;
              }
            }
        });
        modalInstance.result.then(function (uiComponent) {
          console.log(uiComponent);
        });
      };
      
      $scope.removeComponent = function() {
         uiComponent.remove($scope.selectedComponent);
         $scope.$parent.selectedComponent=null;
      };
      
      $scope.updateComponent = function() {
        $scope.$parent.selectedComponent.title=$scope.title;
        $scope.$parent.selectedComponent.HTMLcontent=$scope.HTMLcontent;
        uiComponent.update($scope.selectedComponent);
      }; 
      
      $scope.newComponentSelected = function() {
        if($scope.selectedComponent !== null && $scope.selectedComponent === ''){
          return true;
        }else{
          return false;
        }
      }
}])
.factory('uiComponent',['$http', '$filter', function($http, $filter){
  
  var o = {
    uiComponent: []
  };
  o.getAll = function() {
    return $http.get('/uiComponent').success(function(data){
      angular.copy(data, o.uiComponent);
    });
  };
  o.create = function(uiComponent) {
    return $http.post('/uiComponent', uiComponent).success(function(data){
      o.uiComponent.push(data);
    });
  };
  o.remove = function(uiComponent) {
    console.log("deleting " + uiComponent._id);
    return $http.delete('/uiComponent/'+ uiComponent._id).success(function(resp){
      o.uiComponent.splice(o.uiComponent.indexOf(uiComponent),1);
      console.log(resp.message);
    });
  };
  o.update = function(updatedUiComponent) {
    return $http.put('/uiComponent/'+ updatedUiComponent._id, updatedUiComponent).success(function(resp){
      console.log(resp.message);
    });
  };
  return o;
}]);

angular.module('AngularProtoypeEngine.main.project.components')
.controller('componentsModalController', ['$scope', '$modalInstance', 'uiComponent', 'modalData', 'readOnly', function ($scope, $modalInstance, uiComponent, modalData, readOnly) {

  $scope.title = modalData.title;
  $scope.HTMLcontent = modalData.HTMLcontent;
  $scope.readOnly = readOnly;
  $scope.index = uiComponent.uiComponent.indexOf(modalData);

  $scope.ok = function () {
    uiComponent.uiComponent[$scope.index].title = $scope.title;
    uiComponent.uiComponent[$scope.index].HTMLcontent = $scope.HTMLcontent;
    uiComponent.update($scope.index);
    $modalInstance.close(uiComponent.uiComponent[$scope.index]);
  };

}]);
