(function(angular) {
  "use strict";

angular.module('AngularProtoypeEngine.main.project', ['AngularProtoypeEngine.main.project.components',
'AngularProtoypeEngine.main.project.screen', 'AngularProtoypeEngine.main.project.jsonData', 'ngTable'])
  .config(function ($stateProvider) {
    $stateProvider
      .state('AngularProtoypeEngine.main.project', {
        url: '/project',
        templateUrl: 'project/project.tpl.html',
        resolve: {
                        wholeScreenPromise: ['wholeScreens',
                            function (wholeScreens) {
                                return wholeScreens.getAll();
                            }],
                        jsonDataPromise: ['jsonData', 
                            function(jsonData){
                                return jsonData.getAll();
                        }]
                    },
        controller: 'ProjectController'
      });
    
  })
  .controller('ProjectController', function ($scope, $state, wholeScreens, jsonData) {
    $scope.oneAtATime = true;

    $scope.projectName = "Project1";
    $scope.projectDatas = [];
    $scope.projectComponents = [];
    $scope.projectScreens = [];
    $scope.selectedData = null;
    $scope.selectedComponent = null;
    $scope.selectedScreen = null;
    
    var checkSubstring = function(string, substring) {
          if (string.search(substring) > -1) {
              return true;
          }
    };
    var components = wholeScreens.uiComponents;
    var screens = wholeScreens.uiScreens;
    var jsonData = jsonData.jsonData;
    
    $scope.$watch('wholeScreens', function () {
      for(var j = 0; screens.length > j; j++){      
          for (var i = 0; components.length > i; i++) {
              var findmatc = 'preview="' + components[i].title + '"';
              if (checkSubstring(screens[j].HTMLcontent, findmatc) === true) {
                  var beforePreview = screens[j].HTMLcontent.substring(0, screens[j].HTMLcontent.indexOf(findmatc));
                  var afterPreview = screens[j].HTMLcontent.substring(screens[j].HTMLcontent.indexOf(findmatc)+findmatc.length);
                  afterPreview = afterPreview.replace(">", ">" + components[i].HTMLcontent);
                  screens[j].HTMLcontent = beforePreview + afterPreview;
              }
          }
      }
    });
    
    $scope.downloadHTMLs = function() {
      var zip = new JSZip();
      for(var i = 0; screens.length > i; i++){
        zip.file(screens[i].title+".html", screens[i].HTMLcontent);
      }
      var content = zip.generate({type:"blob"});
      saveAs(content, $scope.projectName +"HTMLs.zip");
    };
    
    $scope.downloadJsons = function() {
      var zip = new JSZip();
      for(var i = 0; jsonData.length > i; i++){
        zip.file(jsonData[i].title+".json", jsonData[i].content);
      }
      var content = zip.generate({type:"blob"});
      saveAs(content, $scope.projectName +"JSONs.zip");
    };

    $scope.template='project/projectInfo.tpl.html';
    
    $scope.setData = function(data) {
      $scope.selectedData = data;
    };
    $scope.setComponent = function(comp) {
      $scope.selectedComponent = comp;
    };
    $scope.setScreen = function(screen) {
      $scope.selectedScreen = screen;
    };
    
  })
  .factory('wholeScreens',['$http', '$filter', function($http, $filter){
  
  var o = {
    uiComponents: [],
    uiScreens: []
  };
  o.getAll = function() {
    $http.get('/uiComponent').success(function(data){
      angular.copy(data, o.uiComponents);
    });
    $http.get('/uiScreen').success(function (data) {
      angular.copy(data, o.uiScreens);
    });
  };
  
  return o;
}]);
    
}(angular));
