/*var componentCounter = 1;

UigProvider = function(){};
UigProvider.prototype.dummyData = [];

UigProvider.prototype.findAll = function(callback) {
  callback( null, this.dummyData )
};

UigProvider.prototype.findById = function(id, callback) {
  var result = null;
  for(var i =0;i<this.dummyData.length;i++) {
    if( this.dummyData[i]._id == id ) {
      result = this.dummyData[i];
      break;
    }
  }
  callback(null, result);
};

UigProvider.prototype.save = function(components, callback) {
  var component = null;

  if(components.length == null)
    components = [components];

  for( var i =0;i< components.length;i++ ) {
    component = components[i];
    component._id = componentCounter++;
  

  }
  callback(null, components);/*
};
*/
/* Lets bootstrap with dummy data */

/*
new UigProvider().save([
  {
     "title" : "Button 1",
    "htmlContent" : "<div class=\"btn-group\"> <label class=\"btn btn-primary\" ng-model=\"radioModel\" btn-radio=\"'Left'\">Left</label> <label class=\"btn btn-primary\" ng-model=\"radioModel\" btn-radio=\"'Middle'\">Middle</label> <label class=\"btn btn-primary\" ng-model=\"radioModel\" btn-radio=\"'Right'\">Right</label></div>}",
    "controller" : "angular.module('ui.bootstrap.demo', ['ui.bootstrap']);angular.module('ui.bootstrap.demo').controller('ButtonsCtrl', function ($scope) {$scope.radioModel = 'Middle';});"
}, {
     "title" : "DatePicker",
    "htmlContent" : "<div ng-controller=\"DatepickerDemoCtrl\"> <h4>Date</h4> <div class=\"row\"> <div class=\"col-md-6\"> <p class=\"input-group\"> <input type=\"text\" class=\"form-control\" datepicker-popup=\"{{format}}\" ng-model=\"dt\" is-open=\"opened\" max-date=\"'2015-06-22'\" datepicker-options=\"dateOptions\"  ng-required=\"true\" close-text=\"Close\" /> <span class=\"input-group-btn\"> <button type=\"button\" class=\"btn btn-default\" ng-click=\"open($event)\"><i class=\"glyphicon glyphicon-calendar\"></i></button> </span> </p> </div> </div> ",
    "Controller" : "angular.module('ui.bootstrap.demo', ['ui.bootstrap']); angular.module('ui.bootstrap.demo').controller('DatepickerDemoCtrl', function ($scope) {  weekStart: 0;   $scope.today = function() {  $scope.dt = new Date();  };  $scope.today();  $scope.clear = function () {     $scope.dt = null;   };   $scope.open = function($event) {     //$event.preventDefault();  $event.stopPropagation(); $scope.opened = true;   };    $scope.dateOptions = {    formatYear: 'yy',  startingDay: 1  };   $scope.format = 'dd-MMMM-yyyy'  });"
},
  {
    "title" : "Dropdown",
    "htmlContent" : "<div ng-controller=\"DropdownCtrl\"> <!-- Single button -->  <div class=\"btn-group\" dropdown is-open=\"status.isopen\"> <button type=\"button\" class=\"btn btn-primary dropdown-toggle\" ng-disabled=\"disabled\"> Button dropdown  </button> <ul class=\"dropdown-menu\" role=\"menu\">  <li ng-repeat=\"choice in items\"> <a href>{{choice}}</a>  </li> <li class=\"divider\"></li> <li><a href=\"#\">Separated link</a></li>   </ul>   </div>    <hr /></div>",
    "controller" : "angular.module('ui.bootstrap.demo', ['ui.bootstrap']); angular.module('ui.bootstrap.demo').controller('DropdownCtrl', function ($scope) {   $scope.items = [     'The first',     'The second',     'The third'  ]; $scope.status = {    isopen: false };  $scope.toggleDropdown = function($event) {     $scope.status.isopen = !$scope.status.isopen;  };});"
},
{
        "title" : "Form",
    "htmlContent" : "<div class=\"container\"   <form name=\"userForm\" ng-submit=\"submitForm (userForm.$valid)\" novalidate>         <!-- NAME -->        <div class=\"form-group\" ng-class=\"{ 'has-error' : userForm.name.$invalid && !userForm.name.$pristine }\">             <label>Name</label>             <input type=\"text\" name=\"name\" class=\"form-control\" ng-model=\"user.name\" required>              <p ng-show=\"userForm.name.$invalid || userForm.name.$pristine\" class=\"help-block\">You name is required.</p>         </div>         <!-- USERNAME -->         <div class=\"form-group\" ng-class=\"{ 'has-error' : userForm.username.$invalid && !userForm.username.$pristine }\">             <label>Username</label>             <input type=\"text\" name=\"username\" class=\"form-control\" ng-model=\"user.username\" ng-minlength=\"3\">             <p ng-show=\"userForm.username.$error.minlength\" class=\"help-block\">Username is too short.</p>         </div>        <!-- EMAIL -->        <div class=\"form-group\" ng-class=\"{ 'has-error' : userForm.email.$invalid && !userForm.email.$pristine }\">             <label>Email</label>            <input type=\"email\" name=\"email\" class=\"form-control\" ng-model=\"user.email\">             <p ng-show=\"userForm.email.$invalid && !userForm.email.$pristine\" class=\"help-block\">Enter a valid email.</p>        </div>        <p>        </p>        <!-- PASSWORD -->        <div class=\"form-group\" ng-class=\"{ 'has-error' : userForm.password.$invalid && !userForm.password.$pristine }\">          <label>Password</label>            <input ng-model=\"user.password\" type=\"password\" name=\"password\" class=\"form-control\" ng-minlength=\"5\" />               <p ng-show=\"userForm.password.$error.minlength\" class=\"help-block\">Password is too short.</p>        </div>        <button type=\"submit\" class=\"btn btn-primary\">Submit</button> </form></div>",
    "controller" : ""
}, 
    {
    "title" : "Tab 1",
    "htmlContent" : "<div ng-controller=\"TabsDemoCtrl\">   <tabset>    <tab ng-repeat=\"tab in tabs\" heading=\"{{tab.title}}\" active=\"tab.active\">      {{tab.content}}     </tab>  </tabset> </div>",
    "controller" : "angular.module('ui.bootstrap.demo', ['ui.bootstrap']); angular.module('ui.bootstrap.demo').controller('TabsDemoCtrl', function ($scope) {  $scope.tabs = [    { title:' Title 1', content:'Sample content 1' },    { title:' Title 2', content:'Sample content 2' },    { title:' Title 3', content:'Sample content 3' },    { title:' Title 4', content:'Sample content 4' }  ];});"
}, 
    {
    "title" : "Tab 2",
    "htmlContent" : "<div ng-controller=\"TabsDemoCtrl\">   <tabset type=\"pills\">      <tab ng-repeat=\"tab in tabs\" heading=\"{{tab.title}}\" active=\"tab.active\">      {{tab.content}}          </tab>  </tabset>",
    "controller" : "angular.module('ui.bootstrap.demo', ['ui.bootstrap']); angular.module('ui.bootstrap.demo').controller('TabsDemoCtrl', function ($scope) {  $scope.tabs = [    { title:' Title 1', content:'Sample content 1' },    { title:' Title 2', content:'Sample content 2' },    { title:' Title 3', content:'Sample content 3' },    { title:' Title 4', content:'Sample content 4' }  ];});"
}, 
    {
    "title" : "Table 1",
    "htmlContent" : "<div ng-app=\"main\" ng-controller=\"DemoCtrl\"> <button ng-click=\"tableParams.sorting({})\" class=\"btn btn-default pull-right\">Clear sorting</button>      <table ng-table=\"tableParams\" class=\"table table-striped\">       <tr ng-repeat=\"user in $data\">            <td data-title=\"'Name'\" sortable=\"'name'\"> {{user.name}}            </td>            <td data-title=\"'Position'\"  sortable=\"'position'\">                {{user.position}}            </td>            <td data-title=\"'Office'\" sortable=\"'office'\">                {{user.office}}            </td>        </tr>    </table></div>",
    "controller" : "var app = angular.module('main', ['ngTable']).controller('DemoCtrl', function($scope, $filter, ngTableParams) {    var data = [{name: 'Airi Satou', position:'Accountant', office:'Tokyo'},                {name: 'Angelica Ramos', position:'Chief Executive Officer (CEO)', office:'London'},                {name: 'Ashton Cox', position:'Junior Technical Author', office:'San Francisco'},                {name: 'Bradley Greer', position:'Software Engineer', office:'San Francisco'},                {name: 'Gavin Cortez', position:'Support Engineer', office:'London'},                {name: 'Hermione Butler', position:'Regional Director', office:'London'},                {name: 'Airi Satou', position:'Accountant', office:'Tokyo'},                {name: 'Angelica Ramos', position:'Chief Executive Officer (CEO)', office:'London'},                {name: 'Ashton Cox', position:'Junior Technical Author', office:'San Francisco'},                {name: 'Bradley Greer', position:'Software Engineer', office:'San Francisco'},                {name: 'Gavin Cortez', position:'Support Engineer', office:'London'},                {name: 'Hermione Butler', position:'Regional Director', office:'London'},                {name: 'Airi Satou', position:'Accountant', office:'Tokyo'},                {name: 'Angelica Ramos', position:'Chief Executive Officer (CEO)', office:'London'},                {name: 'Ashton Cox', position:'Junior Technical Author', office:'San Francisco'},                {name: 'Bradley Greer', position:'Software Engineer', office:'San Francisco'},                {name: 'Gavin Cortez', position:'Support Engineer', office:'London'},                {name: 'Hermione Butler', position:'Regional Director', office:'London'}                 ];    $scope.tableParams = new ngTableParams({        page: 1,            // show first page        count: 10,          // count per page        sorting: {        name: 'asc'     // initial sorting        }    }, {        total: data.length, // length of data        getData: function($defer, params) {            // use build-in angular filter            var orderedData = params.sorting() ?                                $filter('orderBy')(data, params.orderBy()) :                                data;            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));       }    });});"
}
    
], function(error, components){});

exports.UigProvider = UigProvider;*/