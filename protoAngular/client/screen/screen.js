angular.module('AngularProtoypeEngine.main.project.screen', ['AngularProtoypeEngine.main.project.components', 'ngSanitize'])
    .config(['$stateProvider',
        function ($stateProvider) {

            $stateProvider
                .state('AngularProtoypeEngine.main.project.screen', {
                    url: '/screen',
                    templateUrl: 'screen/screen.tpl.html',
                    resolve: {
                        uiScreenPromise: ['uiScreen',
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

                    controller: 'ScreenController'
                });
            
        
}])

    .controller('ScreenController', ['$scope', '$http', '$modal', 'FileUploader', 'uiScreen', 'uiComponent', 'jsonData',
        function ($scope, $modal, $http, FileUploader, uiScreen, uiComponent, jsonData) {

            var components = [];
            $scope.uiScreen = uiScreen.uiScreen;
            $scope.$parent.projectScreens = $scope.uiScreen;
            $scope.errorMessage = '';
            $scope.successMessage = '';
            $scope.isCollapsed = true;
            $scope.successAlertIsCollapsed = true;
            $scope.title = '';
            $scope.HTMLcontent = '';
            $scope.mainpage = false;


            components = (uiScreen.getAllCom());
            
            $scope.jsonData = jsonData.jsonData;
            

            $scope.$watch('selectedScreen', function () {
                if ($scope.selectedScreen != null && $scope.selectedScreen !== '') {
                    $scope.title = $scope.selectedScreen.title;
                    $scope.HTMLcontent = $scope.selectedScreen.HTMLcontent;
                    $scope.mainpage = $scope.selectedScreen.mainpage;
                    bindComp();
                } else {
                    $scope.title = '';
                    $scope.HTMLcontent = '';
                    $scope.mainpage = false;

                }
                $scope.setAlerts('', true, '', true);
            });
            $scope.$watch('uiScreen', function () {
                for (var i = $scope.uiScreen.length - 1; i >= 0; i--) {
                    if ($scope.title === $scope.uiScreen[i].title) {
                        $scope.$parent.selectedScreen = $scope.uiScreen[i];
                        //bindComp();
                        break;
                    }
                }
            }, true);
            
            $scope.downloadScreenHTML = function() {
                var wholeHTML;
                 for (var i = 0; components.length > i; i++) {
                     var findmatc = 'preview=' + '"' + components[i].title + '"';
                    if (checkSubstring($scope.HTMLcontent, findmatc) === true) {
                        var beforePreview = $scope.HTMLcontent.substring(0, $scope.HTMLcontent.indexOf(findmatc));
                        var afterPreview = $scope.HTMLcontent.substring($scope.HTMLcontent.indexOf(findmatc)+findmatc.length);
                        afterPreview = afterPreview.replace(">", ">" + components[i].HTMLcontent);
                        wholeHTML = beforePreview + afterPreview;
                    }    
                 }
                 var blob = new Blob([ wholeHTML ], { type : 'application/octet-stream' });
                 saveAs(blob, $scope.title+'.html');
            };
        
            $scope.addScreen = function () {

                checkMainpage(); //Checking if mainpage alredy exist. 
                
                if (!checkField('title')) return;

                if (!checkField('HTMLcontent')) return;
        
                uiScreen.create({
                    title: $scope.title,
                    HTMLcontent: $scope.HTMLcontent,
                    mainpage: $scope.mainpage,
                    Compo: bindComp()

                });
                $scope.setAlerts('', true, 'Successfully created', false);

            };

            var checkField = function (field) {
                if ($scope[field] === '') {
                    $scope.setAlerts('Field ' + field + ' is missing!', false, '', true);
                    $scope.isCollapsed = false;
                    return false;
                }
                return true;
            };

            function checkMainpage() {
                for (var i = $scope.uiScreen.length - 1; i >= 0; i--) {

                    if ($scope.uiScreen[i].mainpage === true && $scope.mainpage === true && $scope.title !== $scope.uiScreen[i].title) {


                        var x = confirm("Mainpage alredy exists.\nMake this mainpage?");
                        if (x === true) {
                            $scope.uiScreen[i].mainpage = false;
                            
                            uiScreen.update($scope.uiScreen[i]);
                        } else {
                            $scope.mainpage = false;
                        }
                    }
                }

            };

            function checkSubstring(string, substring) {
                if (string.search(substring) > -1) {
                    return true;
                }

            };


            function bindComp() {
                var com = [];
                var i = 0;
                while (i < components.length) {
                    for (i; components.length > i; i++) {
                        var findmatc = 'preview=' + '"' + components[i].title + '"';
                        if (checkSubstring($scope.HTMLcontent, findmatc) == true) {
                            com.push(components[i].title);
                            $scope[components[i].data[0].name] = $scope.getJsonContent(components[i].data[0].jsonId);
                            $scope[components[i].title] = components[i].HTMLcontent;
                        }
                    }
                }
               
                return com;

            };

            $scope.getJsonContent = function(id) {
              for(var i = 0; i < $scope.jsonData.length; i++){
                if(id == $scope.jsonData[i]._id){
                  return angular.fromJson($scope.jsonData[i].content);
                }
              }
              return '';
            };

            $scope.removeScreen = function () {
                var x = confirm("Are you sure you want to delete screen?");
                if (x === true) {
                    uiScreen.remove($scope.selectedScreen);
                    $scope.$parent.selectedScreen = null;
                    $scope.setAlerts('', true, '', true);
                }
            };

            $scope.updateScreen = function () {
                if (!checkField('title')) return;
                if (!checkField('HTMLcontent')) return;

                checkMainpage();
                
                $scope.$parent.selectedScreen.title = $scope.title;
                $scope.$parent.selectedScreen.HTMLcontent = $scope.HTMLcontent;
                $scope.$parent.selectedScreen.mainpage = $scope.mainpage;
                $scope.$parent.selectedScreen.Comp = bindComp();
                
                uiScreen.update($scope.selectedScreen);

                $scope.setAlerts('', true, "Successfully updated " + $scope.selectedScreen.title, false);
            };

            $scope.newScreenSelected = function () {
                if ($scope.selectedScreen !== null && $scope.selectedScreen === '') {
                    
                    return true;
                } else {
                    return false;
                }
            }
            
          
            $scope.setAlerts = function (errorMessage, errorCollapsed, successMessage, successCollapsed) {
                if (errorMessage !== null) {
                    $scope.errorMessage = errorMessage;
                }
                if (successMessage !== null) {
                    $scope.successMessage = successMessage;
                }
                if (errorCollapsed !== null) {
                    $scope.isCollapsed = errorCollapsed;
                }
                if (successCollapsed !== null) {
                    $scope.successAlertIsCollapsed = successCollapsed;
                }
            };

            
}])
    .factory('uiScreen', ['$http', '$filter', 'uiComponent',
        function ($http, $filter, uiComponent) {

            var o = {
                uiScreen: []
            };

            o.getAllCom = function () {
                return uiComponent.uiComponent;
            };


            o.getAll = function () {
                return $http.get('/uiScreen').success(function (data) {
                    angular.copy(data, o.uiScreen);
                });
            };
            o.create = function (uiScreen) {
                return $http.post('/uiScreen', uiScreen).success(function (data) {
                    o.uiScreen.push(data);
                });
            };
            o.remove = function (uiScreen) {
                console.log("deleting ");
                return $http.delete('/uiScreen/' + uiScreen._id).success(function (resp) {
                    o.uiScreen.splice(o.uiScreen.indexOf(uiScreen), 1);
                    console.log(resp.message);
                });
            };
            o.update = function (updatedUiScreen) {
                console.log("editing ");
                return $http.put('/uiScreen/' + updatedUiScreen._id, updatedUiScreen).success(function (resp) {
                    console.log(resp.message);
                });
            };
            return o;

}])
    .controller('screenMasterController', ['$scope', '$filter', 'ngTableParams', 'uiScreen',
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
2
            $scope.status = {
                isopen: false
            };
            $scope.toggleDropdown = function ($event) {
                $scope.status.isopen = !$scope.status.isopen;
            };


  }]);