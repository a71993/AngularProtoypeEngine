

angular.module('AngularProtoypeEngine.vaade', ['ui.router', 'AngularProtoypeEngine.main.project.screen'])

.config(function ($stateProvider) {

  $stateProvider
    .state('AngularProtoypeEngine.vaade', {
      url: '/vaade',
      templateUrl: 'screen/screenView.tpl.html', 
     controller: 'ScreenViewController'
    });
})
.controller('ScreenViewController', ['$scope', 'uiScreen',
        function ($scope, uiScreen) {
                       
            $scope.title = "mmmmmmmmmmmmiks";
            
            $scope.HTMLcontent ='<div class="btn-group">\n\t<label class="btn btn-primary" ng-model="radioModel" btn-radio="\'Left\'">\n\t\tLeft\n\t</label> \n\t<label class="btn btn-primary" ng-model="radioModel" btn-radio="\'Middle\'">\n\t\tMiddle\n\t</label> \n\t<label class="btn btn-primary" ng-model="radioModel" btn-radio="\'Right\'">\n\t\tRight\n\t</label>\n</div>';

            

        }])


.directive('screenView', function() {
     return {
        restrict:'E',
        transclude: true,
        scope: { title:'@' },
        template: '<h1> {{title}} </h1>' + '<ng-transclude></ng-transclude>'
     }
    })
/*
.directive('screenBody', function() {
     return {
        restrict:'E',
        transclude: true,
        scope: { HTMLcontent:'@' },
        template: '<div style="background-color: blue> {{HTMLcontent}} </div>' + '<ng-transclude></ng-transclude>'
     }
    })*/;
 //   <screen-body HTMLcontent={{HTMLcontent}}></screen-body>