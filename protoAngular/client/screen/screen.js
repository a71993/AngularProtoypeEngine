angular.module('AngularProtoypeEngine.main.project.screen', ['AngularProtoypeEngine.main.project.components'])
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
                        }]

                    },

                    controller: 'ScreenController'
                });
}])
    .controller('ScreenController', ['$scope', '$http', '$modal', 'FileUploader', 'uiScreen', 'uiComponent',
        function ($scope, $modal, $http, FileUploader, uiScreen, uiComponent) {
            var uploader = $scope.uploader = new FileUploader({
                url: '/upload'
            });

            uploader.filters.push({
                name: 'jsonFilter',
                fn: function (item /*{File|FileLikeObject}*/ , options) {
                    var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                    return '|json|'.indexOf(type) !== -1;
                }
            });





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
            console.log($scope.uiScreen);

            $scope.$watch('selectedScreen', function () {
                if ($scope.selectedScreen != null && $scope.selectedScreen !== '') {
                    $scope.title = $scope.selectedScreen.title;
                    $scope.HTMLcontent = $scope.selectedScreen.HTMLcontent;
                    $scope.mainpage = $scope.selectedScreen.mainpage;
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
                        break;
                    }
                }
            }, true);



            $scope.addScreen = function () {


                checkMainpage(); //Checking if mainpage alredy exist. 
                if (!checkField('title')) return;

                if (!checkField('HTMLcontent')) return;
                includeComponent();

                var a = $scope.$parent.selectedScreen = uiScreen.create({
                    title: $scope.title,
                    HTMLcontent: $scope.HTMLcontent,
                    mainpage: $scope.mainpage,
                    //Compo:includeComponent()

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
                    if ($scope.uiScreen[i].mainpage === true && $scope.mainpage == true && $scope.title !== $scope.uiScreen[i].title) {

                        var x = confirm("Mainpage alredy exists.\nMake this mainpage?");
                        if (x === true) {
                            $scope.uiScreen[i].mainpage = false;
                            //var s=$scope.uiScreen[i].Compo;
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

            function includeComponent() {
                //var matches = [];
                var i = 0;
                while (i < components.length) {
                    for (i; components.length > i; i++) {
                        console.log($scope.HTMLcontent);
                        var findmatc = "<include='" + components[i].title + "'" + ">";
                        console.log(findmatc);
                        if (checkSubstring($scope.HTMLcontent, findmatc) == true) {
                            //replasing include with component html content
                            $scope.HTMLcontent = $scope.HTMLcontent.replace(findmatc, components[i].HTMLcontent);
                            //matches.push(components[i].title);
                        }

                    }
                }
                //return matches;
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
                if(!checkField('title')) return;
                if(!checkField('HTMLcontent')) return;

                checkMainpage();
                includeComponent();
                $scope.$parent.selectedScreen.title = $scope.title;
                $scope.$parent.selectedScreen.HTMLcontent = $scope.HTMLcontent;
                $scope.$parent.selectedScreen.mainpage = $scope.mainpage;
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
}]);