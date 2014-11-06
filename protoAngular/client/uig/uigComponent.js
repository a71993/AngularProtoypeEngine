

angular.module('AngularProtoypeEngine.main.uig.components', ['ui.router'])
.config(function ($stateProvider) {
  $stateProvider
        .state('AngularProtoypeEngine.main.uig.components', {
        url: '/components',
        templateUrl: '/uig/uigComponents.tpl.html',
        resolve: {
            uigComponentPromise: ['uigComponent', function(uigComponent){
            return uigComponent.getAll();
        }]},
        controller: 'uigComponentsController'
      });
  })

.controller('uigComponentsController', ['$scope',  'uigComponent', function ($scope, uigComponent) {

    
      $scope.uigComponent = uigComponent.uigComponent;
      $scope.$parent.uigComponents = $scope.uigComponent;

      $scope.errorMessage = '';
      $scope.isCollapsed=true;
      $scope.title = '';
      $scope.HTMLcontent = '';
      $scope.uigHTML = '';
      $scope.controller = '';
     
   
    
     $scope.$watch('selectedUigComponent', function() {  
        if($scope.selectedUigComponent!=null){ 
          for(var i = 0; i<$scope.uigComponent.length; i++) {
               if($scope.uigComponent[i].title == $scope.selectedUigComponent.title){
                  $scope.title = $scope.uigComponent[i].title;
                  $scope.HTMLcontent= $scope.uigComponent[i].HTMLcontent;
                 
                  $scope.uigHTML = $scope.asendus;
                  $scope.controller = $scope.uigComponent[i].controller;
           }; 
     
        };
        };
      });     
}])


.factory('uigComponent',['$http', function($http){
  
  var o = {
    uigComponent: []
  };
  o.getAll = function() {
    return $http.get('/uigComponent').success(function(data){
      angular.copy(data, o.uigComponent);
         console.log(data);
        
    });
  };
    
  return o;
}]);



