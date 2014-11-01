
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
    //  $scope.$parent.proov = $scope.proov;
        
      
      $scope.errorMessage = '';
      $scope.isCollapsed=true;
      $scope.title = '';
      $scope.HTMLcontent = '';
      $scope.controller = '';
     
   
    
     $scope.$watch('selectedUigComponent', function() {  
         //siin if- juurespeaks olema $parenti väärtus, mis on nüüd muutunud ja mille järgi
         //saaks valida õige data (sama nagu comopnent.js selectComponent)
         //probleem on selles, et väärtus on kogu aeg null
        if($scope.$selectedUigComponent!=null){ 
          $scope.title=$scope.selectedComponent.title;
          $scope.HTMLcontent=$scope.selectedComponent.HTMLcontent;
        }  
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



