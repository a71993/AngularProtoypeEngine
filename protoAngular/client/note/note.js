angular.module('AngularProtoypeEngine.main.note', ['ui.router'])

.config(function ($stateProvider) {

  $stateProvider
    .state('AngularProtoypeEngine.main.notes', {
      url: '/notes',
      templateUrl: 'note/note.tpl.html',
      controller: 'NoteController'
    });
})
.controller('NoteController', function ($scope) {
  $scope.message = 'Application info.';
});
