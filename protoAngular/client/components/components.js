
angular.module('AngularProtoypeEngine.main.project.components', ['AngularProtoypeEngine.main.project.jsonData'])
.config(['$stateProvider', function ($stateProvider) {

  $stateProvider
    .state('AngularProtoypeEngine.main.project.components', {
      url: '/components',
      templateUrl: 'components/components.tpl.html',
      resolve: {
        uiComponentPromise: ['uiComponent', function(uiComponent){
        return uiComponent.getAll();
        }],
        uiComponentJsonDataPromise: ['jsonData', function(jsonData){
        return jsonData.getAll();
        }]
      },
      controller: 'componentsController'
    });
}])
.controller('componentsController', ['$scope', '$modal', 'FileUploader', 'uiComponent', 'jsonData', function ($scope, $modal, FileUploader, uiComponent, jsonData) {


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
      $scope.jsonData = jsonData.jsonData;
      
      $scope.errorMessage = '';
      $scope.successMessage = '';
      $scope.isCollapsed = true;
      $scope.successAlertIsCollapsed = true;
      $scope.title = '';
      $scope.HTMLcontent = '';
      $scope.selectedJsonData = '';
      
      $scope.$watch('selectedComponent', function() {
        if($scope.selectedComponent != null && $scope.selectedComponent!==''){
          $scope.title = $scope.selectedComponent.title;
          $scope.HTMLcontent = $scope.selectedComponent.HTMLcontent;
          $scope.selectedJsonData = $scope.selectedComponent.data;
          updateDataNames();
        }else{
          $scope.title = '';
          $scope.HTMLcontent = '';
          $scope.selectedJsonData = '';
        }  
        $scope.setAlerts('', true, '', true);
      });
      
      $scope.$watch('uiComponent', function() {
          for(var i = $scope.uiComponent.length-1; i >= 0; i--){
            if($scope.title === $scope.uiComponent[i].title){
              $scope.$parent.selectedComponent = $scope.uiComponent[i];
              break;
            }
        }
      }, true);
      
      var updateDataNames = function(){
        for(var i = 0; i < $scope.selectedJsonData.length; i++){
          var selectedData = $scope.selectedJsonData[i];
          if(selectedData){
            console.log(selectedData.name);
            $scope[selectedData.name] = $scope.getJsonContent(selectedData.jsonId);
            console.log($scope[selectedData.name]);
          }
        } 
      };

      $scope.addComponent = function(){
        if(!checkField('title')) return;
        
        if(!checkField('HTMLcontent')) return;

        uiComponent.create({
          title: $scope.title,
          HTMLcontent: $scope.HTMLcontent,
          data: $scope.selectedJsonData
        });
        $scope.setAlerts('', true, 'Successfully created', false);
        
      };
      
      var checkField = function(field) {
        if($scope[field] ==='') { 
          $scope.setAlerts('Field ' + field + ' is missing!', false, '', true);
          return false;
        }
        return true;
      };
      
      $scope.show = function(expandidData){
        var modalInstance = $modal.open({
            templateUrl: 'components/componentsModal.tpl.html',
            controller: 'componentsModalController',
            resolve: {
              expandidData: function () {
                return expandidData;
              },
              selectedComponent: function () {
                return $scope.selectedComponent;
              },
              selectedJsonData: function () {
                return $scope.selectedJsonData;
              }
            }
            
        });
        modalInstance.result.then(function (result) {
          $scope.selectedJsonData = result;
        });
      };
      
      $scope.removeComponent = function() {
         uiComponent.remove($scope.selectedComponent);
         $scope.$parent.selectedComponent=null;
         $scope.setAlerts('', true, '', true);
      };
      
      $scope.updateComponent = function() {
        if(!checkField('title')) return;
        
        if(!checkField('HTMLcontent')) return;

        $scope.$parent.selectedComponent.title = $scope.title;
        $scope.$parent.selectedComponent.HTMLcontent = $scope.HTMLcontent;
        $scope.$parent.selectedComponent.data = $scope.selectedJsonData;
        uiComponent.update($scope.selectedComponent);
        
        $scope.setAlerts('', true,  "Successfully updated " + $scope.selectedComponent.title, false);
      }; 
      
      $scope.getJsonDataModal = function() {
        var expandidData = [];
        var tmpSelectedJsonDataMap = {};
        for (var i = 0; i < $scope.selectedJsonData.length; i++){
          tmpSelectedJsonDataMap[$scope.selectedJsonData[i].jsonId] = $scope.selectedJsonData[i].name;
        }
        for(var i = 0; i < $scope.jsonData.length; i++){
          if($scope.jsonData[i]._id in tmpSelectedJsonDataMap){
            expandidData.push({jsonId: $scope.jsonData[i]._id, title: $scope.jsonData[i].title + '.json', name: tmpSelectedJsonDataMap[$scope.jsonData[i]._id], selected: true});
          }else{
            expandidData.push({jsonId: $scope.jsonData[i]._id, title: $scope.jsonData[i].title + '.json', name: '', selected: false});
          }
        }
        $scope.show(expandidData);
      };
      
      $scope.newComponentSelected = function() {
        if($scope.selectedComponent !== null && $scope.selectedComponent === ''){
          return true;
        }else{
          return false;
        }
      };
      
      $scope.getJsonTitle = function(id) {
        for(var i = 0; i < $scope.jsonData.length; i++){
          if(id == $scope.jsonData[i]._id){
            return $scope.jsonData[i].title;
          }
        }
        return '';
      };
      

      $scope.getJsonContent = function(id) {
        for(var i = 0; i < $scope.jsonData.length; i++){
          if(id == $scope.jsonData[i]._id){
            return angular.fromJson($scope.jsonData[i].content);
          }
        }
        return '';
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
.controller('componentsModalController', ['$scope', '$modalInstance', 'expandidData','uiComponent', 'selectedComponent', 'selectedJsonData',
function ($scope, $modalInstance , expandidData, uiComponent,  selectedComponent, selectedJsonData) {

  $scope.isCollapsed=true;
  $scope.expandidData=expandidData;
  $scope.errorMessage='';
  
  $scope.ok = function () {
    $scope.isCollapsed = false;
    var data = [];
    for(var i = 0; i < expandidData.length; i++){
      if(expandidData[i].selected === true){
        if(expandidData[i].name == ''){
          $scope.errorMessage = 'Selected jsonData must have name. Unselect jsonData or insert name for it.';
          $scope.isCollapsed = false;
          return;
        }
        data.push({jsonId: expandidData[i].jsonId, name: expandidData[i].name});
      }
    }
    selectedComponent.data=data;
    $modalInstance.close(data);
  };

}])
  .controller('componentMasterController', ['$scope',  '$filter', 'ngTableParams', function ($scope,  $filter, ngTableParams) {
    
    var data = [{name: 'Airi Satou', position:'Accountant', office:'Tokyo'},
      {name: 'Angelica Ramos', position:'Chief Executive Officer (CEO)', office:'London'},
      {name: 'Ashton Cox', position:'Junior Technical Author', office:'San Francisco'},
      {name: 'Bradley Greer', position:'Software Engineer', office:'San Francisco'}
      ]; 
      
    $scope.tableParams = new ngTableParams({        
        page: 1,            
        count: 10,          
        sorting: {        
          name: 'asc'       
        }    
      }, 
      {        
        total: data.length,       
        getData: function($defer, params) {            
          var orderedData = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : data;            
          $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));       
      }    
      
    });
    
      
    weekStart: 0;
    $scope.today = function() {
      $scope.dt = new Date();
    };
    $scope.today();
    $scope.clear = function () {
      $scope.dt = null;
    };
    $scope.open = function($event) {
      //$event.preventDefault();
      $event.stopPropagation(); 
      $scope.opened = true;
    };
    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };
    $scope.format = 'dd-MMMM-yyyy';
    
    $scope.status = {
      isopen: false
    };
    $scope.toggleDropdown = function($event) {
      $scope.status.isopen = !$scope.status.isopen;
    };
  }]);
 
