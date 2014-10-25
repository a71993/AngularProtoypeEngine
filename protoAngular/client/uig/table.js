var app = angular.module('main', ['ngTable']).
controller('DemoCtrl', function($scope, $filter, ngTableParams) {
    var data = [{name: 'Airi Satou', position:'Accountant', office:'Tokyo'},
                {name: 'Angelica Ramos', position:'Chief Executive Officer (CEO)', office:'London'},
                {name: 'Ashton Cox', position:'Junior Technical Author', office:'San Francisco'},
                {name: 'Bradley Greer', position:'Software Engineer', office:'San Francisco'},
                {name: 'Gavin Cortez', position:'Support Engineer', office:'London'},
                {name: 'Hermione Butler', position:'Regional Director', office:'London'},
                {name: 'Airi Satou', position:'Accountant', office:'Tokyo'},
                {name: 'Angelica Ramos', position:'Chief Executive Officer (CEO)', office:'London'},
                {name: 'Ashton Cox', position:'Junior Technical Author', office:'San Francisco'},
                {name: 'Bradley Greer', position:'Software Engineer', office:'San Francisco'},
                {name: 'Gavin Cortez', position:'Support Engineer', office:'London'},
                {name: 'Hermione Butler', position:'Regional Director', office:'London'},
                {name: 'Airi Satou', position:'Accountant', office:'Tokyo'},
                {name: 'Angelica Ramos', position:'Chief Executive Officer (CEO)', office:'London'},
                {name: 'Ashton Cox', position:'Junior Technical Author', office:'San Francisco'},
                {name: 'Bradley Greer', position:'Software Engineer', office:'San Francisco'},
                {name: 'Gavin Cortez', position:'Support Engineer', office:'London'},
                {name: 'Hermione Butler', position:'Regional Director', office:'London'}
              
                ];

    $scope.tableParams = new ngTableParams({
        page: 1,            // show first page
        count: 10,          // count per page
        sorting: {
        name: 'asc'     // initial sorting
        }
    }, {
        total: data.length, // length of data
        getData: function($defer, params) {
            // use build-in angular filter
            var orderedData = params.sorting() ?
                                $filter('orderBy')(data, params.orderBy()) :
                                data;

            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });
});