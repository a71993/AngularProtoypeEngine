(function (angular) {
  "use strict";

  angular.module('AngularProtoypeEngine')
  .directive('preview', function ($compile) {
    return {
      restrict: 'A',
      replace: true,
      link: function (scope, element, attrs) {
        scope.$watch(attrs.preview, function(html) {
          element.html(html);
          $compile(element.contents())(scope);
        });
      }
    };
  });
}(angular));