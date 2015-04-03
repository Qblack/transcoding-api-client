/**
 * Created by Q on 4/1/2015.
 */
'use strict';

angular.module('transcoding-ui.view_history', ['ngRoute', 'ui.bootstrap', 'ngCookies'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/history', {
            templateUrl: 'view_history/view_history.html',
            controller: 'ViewHistoryCtrl'
        });
    }])

    .controller('ViewHistoryCtrl', ['$scope','$cookies',function ($scope,$cookies) {
        $scope.files = [];

        angular.forEach($cookies, function(value, key){
            if(key!='username'){
                var hyphen_index = value.indexOf('-');
                var original_name = value.substr(hyphen_index+1, value.length-hyphen_index-2);
                $scope.files.push({'id':key,'name':original_name});
            }
        })

    }]);