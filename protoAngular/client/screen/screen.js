
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
          
        checkMainpage();//Checking if mainpage alredy exist. 
        if(!checkField('title')) return;
        
        if(!checkField('HTMLcontent')) return;  
          
        
        $scope.$parent.selectedScreen=uiScreen.create({
          title: $scope.title,
          HTMLcontent: $scope.HTMLcontent,
          mainpage:$scope.mainpage
        });
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
      };
    function checkMainpage(){
          for(var i = $scope.uiScreen.length-1; i >= 0; i--){
              if($scope.uiScreen[i].mainpage===true){
                  
                  var x=confirm("Mainpage alredy exists.\nMake this mainpage?");
                  if(x===true){
                    $scope.uiScreen[i].mainpage=false;
                      uiScreen.update($scope.uiScreen[i]);
                  }else{$scope.mainpage=false;}
              }
            console.log($scope.uiScreen[i]);
        }
        
    };
    
    
      
    
     /*
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
      
      $scope.removeScreen = function() {
         var x=confirm("Are you sure you want to delete screen?");
         if(x===true){
         uiScreen.remove($scope.selectedScreen);
         $scope.$parent.selectedScreen=null;}
      };
       
      $scope.updateScreen = function() {
        console.log($scope.HTMLcontent);
        $scope.selectedScreen.title=$scope.title;
        $scope.selectedScreen.HTMLcontent=$scope.HTMLcontent;
        $scope.selectedScreen.mainpage=$scope.mainpage;
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
    console.log("editing " );
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
