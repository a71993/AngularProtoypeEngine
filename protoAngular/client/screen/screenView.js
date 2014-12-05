

angular.module('AngularProtoypeEngine.vaade', ['ui.router', 'AngularProtoypeEngine.main.project.screen'])

.config(function ($stateProvider) {
 
    $stateProvider
    .state('AngularProtoypeEngine.vaade', {
      url: '/:name',
      templateUrl: 'screen/screenView.tpl.html', 
     controller: 'ScreenViewController',
      resolve: {
             uiscreenPromise: ['uiScreen',
                    function (uiScreen) {
                    return uiScreen.getAll();
                    }],
            uiComponentPromise: ['uiComponent',
                        function (uiComponent) {
                            return uiComponent.getAll();
                    }],
            uiComponentJsonDataPromise: ['jsonData', 
                        function(jsonData){
                            return jsonData.getAll();
                    }]
      },        

    });
})
.controller('ScreenViewController', ['$scope', 'uiScreen','$sce','screenView', '$stateParams', 'uiComponent', 'jsonData',
        function ($scope, uiScreen, $sce, screenView, $stateParams, uiComponent, jsonData) {
            
            $scope.content = '';
            $scope.screenView = screenView.screenView;
            $scope.screens = (screenView.getAllScreens());
            $scope.name = $stateParams.name;
            
            var components = uiComponent.uiComponent;
            var jsons = jsonData.jsonData;
           
            
            $scope.$watch('$scope.name', function () {
                for (var i = 0; i<$scope.screens.length; i++) {
                    if ($scope.name === $scope.screens[i].title) {
                        $scope.content = $scope.screens[i].HTMLcontent;
                        $scope.Htmlcontent = $scope.content;
                        bindComp();
                        console.log(components);
                        console.log(jsons);
                        break;
                    }
                    else { $scope.content = "<h3> URL does not exist. </br> Try adding /main or a screen name<h3>";}
                
                }
                $scope.Htmlcontent = $scope.content;

            }, true);
            
         
           
           console.log($scope.name);
            $scope.title = "M";    
            
            function checkSubstring(string, substring) {
                if (string.search(substring) > -1) {
                    return true;
                }

            }


            function bindComp() {
                for (var i = 0; components.length > i; i++) {
                    var findmatc = 'preview=' + '"' + components[i].title + '"';
                    if (checkSubstring($scope.Htmlcontent, findmatc) === true) {
                        $scope[components[i].data[0].name] = $scope.getJsonContent(components[i].data[0].jsonId);
                        $scope[components[i].title] = components[i].HTMLcontent;
                        console.log($scope[components[i].data[0].name]);
                        console.log($scope[components[i].title]);
                    }
                }
            }
            
            $scope.getJsonContent = function(id) {
              for(var i = 0; i < jsons.length; i++){
                if(id == jsons[i]._id){
                  return angular.fromJson(jsons[i].content);
                }
              }
              return '';
            };
            

        }])


.directive('screenView', function() {
     return {
        restrict:'E',
        transclude: true,
        scope: { title:'@' }
        
     }
    })

.factory('screenView', ['uiScreen',
        function (uiScreen) {

            var o = {
                screenView: []
            };

            o.getAllScreens = function () {
                return uiScreen.uiScreen;
            };
            
            return o;
        }])

  .controller('screenViewMasterController', ['$scope', '$filter', 'ngTableParams', 'uiScreen',
        function ($scope, $filter, ngTableParams, uiScreen) {

            var data = [{
                    name: 'Airi Satou',
                    position: 'Accountant',
                    office: 'Tokyo'
                },
                {
                    name: 'Angelica Ramos',
                    position: 'Chief Executive Officer (CEO)',
                    office: 'London'
                },
                {
                    name: 'Ashton Cox',
                    position: 'Junior Technical Author',
                    office: 'San Francisco'
                },
                {
                    name: 'Bradley Greer',
                    position: 'Software Engineer',
                    office: 'San Francisco'
                },
                {
                    name: 'Gavin Cortez',
                    position: 'Support Engineer',
                    office: 'London'
                },
                {
                    name: 'Hermione Butler',
                    position: 'Regional Director',
                    office: 'London'
                }
      ];

            $scope.tableParams = new ngTableParams({
                page: 1,
                count: 10,
                sorting: {
                    name: 'asc'
                }
            }, {
                total: data.length,
                getData: function ($defer, params) {
                    var orderedData = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : data;
                    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }

            });
            weekStart: 0;
            $scope.today = function () {
                $scope.dt = new Date();
            };
            $scope.today();
            $scope.clear = function () {
                $scope.dt = null;
            };

            $scope.open = function ($event) {
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
            $scope.toggleDropdown = function ($event) {
                $scope.status.isopen = !$scope.status.isopen;
            };


  }]);