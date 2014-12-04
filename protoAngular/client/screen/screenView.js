

angular.module('AngularProtoypeEngine.vaade', ['ui.router', 'AngularProtoypeEngine.main.project.screen'])

.config(function ($stateProvider) {

  $stateProvider
    .state('AngularProtoypeEngine.vaade', {
      url: '/vaade',
      templateUrl: 'screen/screenView.tpl.html', 
     controller: 'ScreenViewController'
    });
})
.controller('ScreenViewController', ['$scope', 'uiScreen','$sce',
        function ($scope, uiScreen,$sce) {
            $scope.title = "M";          
            $scope.HTMLcontent = $sce.trustAsHtml('<div class="btn-group">\n\t<label class="btn btn-primary" ng-model="radioModel" btn-radio="\'Left\'">\n\t\tLeft\n\t</label> \n\t<label class="btn btn-primary" ng-model="radioModel" btn-radio="\'Middle\'">\n\t\tMiddle\n\t</label> \n\t<label class="btn btn-primary" ng-model="radioModel" btn-radio="\'Right\'">\n\t\tRight\n\t</label>\n</div>');

            

        }])


.directive('screenView', function() {
     return {
        restrict:'E',
        transclude: true,
        scope: { title:'@' },
        template: '<div style="border: 1px solid black;">' +
                    '<div> {{HTMLcontent}} </div>' +
                    '<div style="background-color: gray">{{title}}</div>' +
                    '<ng-transclude></ng-transclude>' +
                  '</div>'
     }
    })
