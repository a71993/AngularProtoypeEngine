

angular.module('AngularProtoypeEngine.main.uig.components', ['ui.router', 'ngTable'])
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
}])

.controller('uigMasterController', ['$scope',  '$filter', 'ngTableParams', function ($scope,  $filter, ngTableParams) {
  
    //table
    var data = [{name: 'Airi Satou', position:'Accountant', office:'Tokyo'},
      {name: 'Angelica Ramos', position:'Chief Executive Officer (CEO)', office:'London'},
      {name: 'Ashton Cox', position:'Junior Technical Author', office:'San Francisco'},
      {name: 'Bradley Greer', position:'Software Engineer', office:'San Francisco'},
      {name: 'Gavin Cortez', position:'Support Engineer', office:'London'},
      {name: 'Hermione Butler', position:'Regional Director', office:'London'},
      {name: 'Airi Satou', position:'Accountant', office:'Tokyo'},
      {name: 'Angelica Ramos', position:'Chief Executive Officer (CEO)', office:'London'},
      {name: 'Ashton Cox', position:'Junior Technical Author', office:'San Francisco'},
      {name: 'Bradley Greer', position:'Software Engineer', office:'San Francisco'},
      {name: 'Gavin Cortez', position:'Support Engineer', office:'London'},
      {name: 'Hermione Butler', position:'Regional Director', office:'London'},
      {name: 'Airi Satou', position:'Accountant', office:'Tokyo'},
      {name: 'Angelica Ramos', position:'Chief Executive Officer (CEO)', office:'London'},
      {name: 'Ashton Cox', position:'Junior Technical Author', office:'San Francisco'},
      {name: 'Bradley Greer', position:'Software Engineer', office:'San Francisco'},
      {name: 'Gavin Cortez', position:'Support Engineer', office:'London'},
      {name: 'Hermione Butler', position:'Regional Director', office:'London'}                 
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
    
    //button
    $scope.radioModel = 'Middle';

    //tabs
    $scope.tabs = [
      { title:' Title 1', content:'Sample content 1' },
      { title:' Title 2', content:'Sample content 2' },
      { title:' Title 3', content:'Sample content 3' },
      { title:' Title 4', content:'Sample content 4' }  
    ];
      
    //datepicker
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
    
    //dropdown
    $scope.items = [
      'The first',
      'The second',
      'The third'
    ];
    $scope.status = {
      isopen: false
    };
    $scope.toggleDropdown = function($event) {
      $scope.status.isopen = !$scope.status.isopen;
    };

}]);