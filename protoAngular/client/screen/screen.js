
angular.module('AngularProtoypeEngine.main.project.screen', [])
.config(['$stateProvider', function ($stateProvider) {

  $stateProvider
    .state('AngularProtoypeEngine.main.project.screen', {
      url: '/screen',
      templateUrl: 'screen/screen.tpl.html',
      resolve: {
        uiScreenPromise: ['uiScreen', function(uiScreen){
        return uiScreen.getAll();
        }]
      },
      controller: 'ScreenController'
    });
}])
.controller('ScreenController', ['$scope', '$modal', 'FileUploader', 'uiScreen', function ($scope, $modal, FileUploader, uiScreen) {
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
      
      $scope.uiScreen = uiScreen.uiScreen;
      $scope.$parent.projectScreens=$scope.uiScreen;
      
      $scope.errorMessage = '';
      $scope.isCollapsed=true;
      $scope.title = '';
      $scope.HTMLcontent = '';
      $scope.mainpage=false;
        
      $scope.$watch('selectedScreen',function(){
          if($scope.selectedScreen!=null && $scope.selectedScreen!==''){
              $scope.title=$scope.selectedScreen.title;
              $scope.HTMLcontent=$scope.selectedScreen.HTMLcontent;
              $scope.mainpage=$scope.selectedScreen.mainpage;
          }else{
              $scope.title='';
              $scope.HTMLcontent='';
              $scope.mainpage=false;
          }
      });    

      $scope.addScreen = function(){
        if(!checkField('title')) return;
        
        if(!checkField('HTMLcontent')) return;
          /*In future DB check if main page alredy chosen*/

        $scope.$parent.selectedScreen=uiScreen.create({
          title: $scope.title,
          HTMLcontent: $scope.HTMLcontent,
          mainpage:$scope.mainpage
        });
        console.log($scope.mainpage);
        //$scope.title = '';
        //$scope.HTMLcontent = '';
        $scope.isCollapsed=true;
        $scope.errorMessage = '';
        //$scope.mainpage=false;
      };
      
      var checkField = function(field) {
        if($scope[field] ==='') { 
          $scope.errorMessage = 'Field ' + field + ' is missing!';
          $scope.isCollapsed=false;
          return false;
        }
        return true;
      };/*
      $scope.addDummyData=function(modalData, readOnly){
          var modalInstance=$modal.open({
              templateUrl:'screen/screenDataModal.tpl.html',
              controller:'screenModalController',
            resolve: {
              modalData: function () {
                return modalData;
              },
              readOnly: function () {
                return readOnly;
              }
            }});
          
      };*/
      
      /*$scope.show = function(modalData, readOnly){
        var modalInstance = $modal.open({
            templateUrl: 'screen/screenModal.tpl.html',
            controller: 'screenModalController',
            resolve: {
              modalData: function () {
                return modalData;
              },
              readOnly: function () {
                return readOnly;
              }
            }
        });
        modalInstance.result.then(function (uiScreen) {
          console.log(uiScreen);
        });
      };*/
      
      $scope.removeScreen = function() {
         uiScreen.remove($scope.selectedScreen);
         $scope.$parent.selectedScreen=null;
      };
      
      $scope.updateScreen = function() {
        $scope.$parent.selectedScreen.title=$scope.title;
        $scope.$parent.selectedScreen.HTMLcontent=$scope.HTMLcontent;
        $scope.$parent.selectedScreen.mainpage=$scope.mainpage;
        uiScreen.update($scope.selectedScreen);        
      }; 
    
      $scope.newScreenSelected=function(){
          if($scope.selectedScreen !==null && $scope.selectedScreen===''){
              return true;
          }else{
              return false;
          }
      }
}])
.factory('uiScreen',['$http', '$filter', function($http, $filter){

    
  var o = {
    uiScreen: []
  };
  o.getAll = function() {
    return $http.get('/uiScreen').success(function(data){
      angular.copy(data, o.uiScreen);
    });
  };
  o.create = function(uiScreen) {
    return $http.post('/uiScreen', uiScreen).success(function(data){
      o.uiScreen.push(data);
    });
  };
  o.remove = function(uiScreen) {
    console.log("deleting ");
    return $http.delete('/uiScreen/'+ uiScreen._id).success(function(resp){
      o.uiScreen.splice(o.uiScreen.indexOf(uiScreen),1);
      console.log(resp.message);
    });
  };
  o.update = function(updatedUiScreen) {
    console.log("editing "  );
    return $http.put('/uiScreen/'+ updatedUiScreen._id,updatedUiScreen).success(function(resp){
      console.log(resp.message);
    });
  };
  return o;
}]);

angular.module('AngularProtoypeEngine.main.project.screen')
.controller('screenModalController', ['$scope', '$modalInstance', 'uiScreen', 'modalData', 'readOnly', function ($scope, $modalInstance, uiScreen, modalData, readOnly) {

  $scope.title = modalData.title;
  $scope.HTMLcontent = modalData.HTMLcontent;
  $scope.mainpage=modalData.mainpage;
  $scope.readOnly = readOnly;
  $scope.index = uiScreen.uiScreen.indexOf(modalData);
  /*                                  
  $scope.okData = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancelData = function () {
    $modalInstance.dismiss('cancel');
  };*/

  $scope.ok = function () {
    uiScreen.uiScreen[$scope.index].title = $scope.title;
    uiScreen.uiScreen[$scope.index].HTMLcontent = $scope.HTMLcontent;
    uiScreen.uiScreen[$scope.index].mainpage=$scope.mainpage;  
    uiScreen.update($scope.index);
    $modalInstance.close(uiScreen.uiScreen[$scope.index]);
  };

}]);
