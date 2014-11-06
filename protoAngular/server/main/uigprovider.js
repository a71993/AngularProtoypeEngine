//VÄLJA KOMMENTEERITUD, ET SAAKS KÄIMA PANNA (VÄLTIDA TOPELT PANEMIST)

var assert = require('assert');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


/**
 * Connect to the db
 */



mongoose.connect('mongodb://localhost/AngularProtoypeEngine');
mongoose.connection.on('error', function() {
  console.error('connection error', arguments);
});




/**
 * Schemas
 */


var uigComponent = new Schema({
 title: {
    type: String,
    required: true, 
    unique: true
  },
  HTMLcontent: {}, 
  controller: {}
});


var UigComponent = mongoose.model('UigComponent',uigComponent);



mongoose.connection.on('open', function() {

 
    /**
   * Generate data
   */

    var uigcomponents = [];
    uigcomponents.push({
      title: 'Button 1',
      HTMLcontent : "<div class=\"btn-group\">\n\t<label class=\"btn btn-primary\" ng-model=\"radioModel\" btn-radio=\"'Left'\">Left</label> \n\t <label class=\"btn btn-primary\" ng-model=\"radioModel\" btn-radio=\"'Middle'\">Middle</label> \n\t <label class=\"btn btn-primary\" ng-model=\"radioModel\" btn-radio=\"'Right'\">Right</label>\n</div>",
    controller : "angular.module('ui.bootstrap.demo', ['ui.bootstrap']);angular.module('ui.bootstrap.demo').controller('ButtonsCtrl', function ($scope) {$scope.radioModel = 'Middle';});"
    })
    uigcomponents.push({
      title : "DatePicker",
      HTMLcontent : "<div ng-controller=\"DatepickerDemoCtrl\"> \n\t <h4>Date</h4> \n\t <div class=\"row\"> \n\t <div class=\"col-md-6\"> \n\t<p class=\"input-group\"> \n\t<input type=\"text\" class=\"form-control\" datepicker-popup=\"{{format}}\" ng-model=\"dt\" is-open=\"opened\" max-date=\"'2015-06-22'\" datepicker-options=\"dateOptions\"  ng-required=\"true\" close-text=\"Close\" /> \n\t <span class=\"input-group-btn\"> \n\t<button type=\"button\" class=\"btn btn-default\" ng-click=\"open($event)\">\n\t\t<i class=\"glyphicon glyphicon-calendar\">\n\t</i>\n     </button>\n </span>\n </p> \n </div>\n</div> ",
      controller : "angular.module('ui.bootstrap.demo', ['ui.bootstrap']); angular.module('ui.bootstrap.demo').controller('DatepickerDemoCtrl', function ($scope) {  weekStart: 0;   $scope.today = function() {  $scope.dt = new Date();  };  $scope.today();  $scope.clear = function () {     $scope.dt = null;   };   $scope.open = function($event) {     //$event.preventDefault();  $event.stopPropagation(); $scope.opened = true;   };    $scope.dateOptions = {    formatYear: 'yy',  startingDay: 1  };   $scope.format = 'dd-MMMM-yyyy'  });"
    })
    uigcomponents.push({
     title : "Dropdown",
     HTMLcontent : "<div> \n <div class=\"btn-group\" dropdown is-open=\"status.isopen\">\n <button type=\"button\" class=\"btn btn-primary dropdown-toggle\" ng-disabled=\"disabled\"> Button dropdown</button> \n<ul class=\"dropdown-menu\" role=\"menu\"> \n\t <li ng-repeat=\"choice in items\"> \n\t <a href>{{choice}}</a></li> \n\t <li class=\"divider\"></li> \n\t <li><a href=\"#\">Separated link</a></li> \n  </ul> \n  </div>\n<hr />\n</div>",
    controller : "angular.module('ui.bootstrap.demo', ['ui.bootstrap']); angular.module('ui.bootstrap.demo').controller('DropdownCtrl', function ($scope) {   $scope.items = [     'The first',     'The second',     'The third'  ]; $scope.status = {    isopen: false };  $scope.toggleDropdown = function($event) {     $scope.status.isopen = !$scope.status.isopen;  };});"
    })
    uigcomponents.push({
       title : "Form",
       HTMLcontent : "<div class=\"container\" \n\t  <form name=\"userForm\" ng-submit=\"submitForm (userForm.$valid)\" novalidate>   \n\t  <!-- NAME -->     \n\t <div class=\"form-group\" ng-class=\"{ 'has-error' : userForm.name.$invalid && !userForm.name.$pristine }\">    \n\t<label>Name</label>\n\t <input type=\"text\" name=\"name\" class=\"form-control\" ng-model=\"user.name\" required>\n\t <p ng-show=\"userForm.name.$invalid || userForm.name.$pristine\" class=\"help-block\">You name is required.</p>\n\t</div>     \n\t     <!-- USERNAME -->    \n\t <div class=\"form-group\" ng-class=\"{ 'has-error' : userForm.username.$invalid && !userForm.username.$pristine }\">              \n\t <label>Username</label>\n\t <input type=\"text\" name=\"username\" class=\"form-control\" ng-model=\"user.username\" ng-minlength=\"3\"> \n\t <p ng-show=\"userForm.username.$error.minlength\" class=\"help-block\">Username is too short.</p>  \n\t</div>   \n\t   <!-- EMAIL -->  \n\t   <div class=\"form-group\" ng-class=\"{ 'has-error' : userForm.email.$invalid && !userForm.email.$pristine }\">  \n\t <label>Email</label>            \n\t<input type=\"email\" name=\"email\" class=\"form-control\" ng-model=\"user.email\">             \n\t<p ng-show=\"userForm.email.$invalid && !userForm.email.$pristine\" class=\"help-block\">Enter a valid email.</p> \n</div>\n\n        <!-- PASSWORD -->     \n\t <div class=\"form-group\" ng-class=\"{ 'has-error' : userForm.password.$invalid && !userForm.password.$pristine }\">\n\t<label>Password</label> \n\t<input ng-model=\"user.password\" type=\"password\" name=\"password\" class=\"form-control\" ng-minlength=\"5\" />               \n\t<p ng-show=\"userForm.password.$error.minlength\" class=\"help-block\">Password is too short.</p>\n\t</div>\n\t<button type=\"submit\" class=\"btn btn-primary\">Submit</button>\n </form>\n</div>",
    controller : ""
    })
    uigcomponents.push({
     title : "Tab 1",
     HTMLcontent : "<div ng-controller=\"TabsDemoCtrl\"> \n\t <tabset> \n\t <tab ng-repeat=\"tab in tabs\" heading=\"{{tab.title}}\" active=\"tab.active\">  \n\t    {{tab.content}}  \n  </tab> \n </tabset>\n</div>",
    controller : "angular.module('ui.bootstrap.demo', ['ui.bootstrap']); angular.module('ui.bootstrap.demo').controller('TabsDemoCtrl', function ($scope) {  $scope.tabs = [    { title:' Title 1', content:'Sample content 1' },    { title:' Title 2', content:'Sample content 2' },    { title:' Title 3', content:'Sample content 3' },    { title:' Title 4', content:'Sample content 4' }  ];});"
    })
    uigcomponents.push({
      title : "Tab 2",
      HTMLcontent : "<div ng-controller=\"TabsDemoCtrl\"> \n\t <tabset type=\"pills\">       \n\t <tab ng-repeat=\"tab in tabs\" heading=\"{{tab.title}}\" active=\"tab.active\">   \n\t     {{tab.content}} \n </tab>  \n</tabset>",
    controller : "angular.module('ui.bootstrap.demo', ['ui.bootstrap']); angular.module('ui.bootstrap.demo').controller('TabsDemoCtrl', function ($scope) {  $scope.tabs = [    { title:' Title 1', content:'Sample content 1' },    { title:' Title 2', content:'Sample content 2' },    { title:' Title 3', content:'Sample content 3' },    { title:' Title 4', content:'Sample content 4' }  ];});"
    })
    uigcomponents.push({
         title : "Table 1",
        HTMLcontent : "<div ng-app=\"main\"  \n\t  <button ng-click=\"tableParams.sorting({})\" class=\"btn btn-default pull-right\">Clear sorting</button>  \n\t  <table ng-table=\"tableParams\" class=\"table table-striped\">  \n\t   <tr ng-repeat=\"user in $data\">     \n\t  <td data-title=\"'Name'\" sortable=\"'name'\"> \n\t  {{user.name}}  \n\t  </td>             \n\t <td data-title=\"'Position'\"  sortable=\"'position'\">  \n\t {{user.position}}       \n\t </td> \n\t <td data-title=\"'Office'\" sortable=\"'office'\">   \n\t {{user.office}}  \n </td>\n </tr>    \n</table>\n</div>",
    controller : "angular.module('main', ['ngTable']).controller('DemoCtrl', function($scope, $filter, ngTableParams) {    var data = [{name: 'Airi Satou', position:'Accountant', office:'Tokyo'},                {name: 'Angelica Ramos', position:'Chief Executive Officer (CEO)', office:'London'},                {name: 'Ashton Cox', position:'Junior Technical Author', office:'San Francisco'},                {name: 'Bradley Greer', position:'Software Engineer', office:'San Francisco'},                {name: 'Gavin Cortez', position:'Support Engineer', office:'London'},                {name: 'Hermione Butler', position:'Regional Director', office:'London'},                {name: 'Airi Satou', position:'Accountant', office:'Tokyo'},                {name: 'Angelica Ramos', position:'Chief Executive Officer (CEO)', office:'London'},                {name: 'Ashton Cox', position:'Junior Technical Author', office:'San Francisco'},                {name: 'Bradley Greer', position:'Software Engineer', office:'San Francisco'},                {name: 'Gavin Cortez', position:'Support Engineer', office:'London'},                {name: 'Hermione Butler', position:'Regional Director', office:'London'},                {name: 'Airi Satou', position:'Accountant', office:'Tokyo'},                {name: 'Angelica Ramos', position:'Chief Executive Officer (CEO)', office:'London'},                {name: 'Ashton Cox', position:'Junior Technical Author', office:'San Francisco'},                {name: 'Bradley Greer', position:'Software Engineer', office:'San Francisco'},                {name: 'Gavin Cortez', position:'Support Engineer', office:'London'},                {name: 'Hermione Butler', position:'Regional Director', office:'London'}                 ];    $scope.tableParams = new ngTableParams({        page: 1,            // show first page        count: 10,          // count per page        sorting: {        name: 'asc'     // initial sorting        }    }, {        total: data.length, // length of data        getData: function($defer, params) {            // use build-in angular filter            var orderedData = params.sorting() ?                                $filter('orderBy')(data, params.orderBy()) :                                data;            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));       }    });});"
    })


    UigComponent.create(uigcomponents, {safe: true}, function(err, docs) {
     assert.ifError(err);
    })
    
});


    
function done(err) {
  if (err) console.error(err.stack);
  mongoose.connection.db.dropDatabase(function() {
    mongoose.connection.close();
  });
}; 
