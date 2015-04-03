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

    .controller('ViewHistoryCtrl', ['$scope','$cookies','awsApiService' ,function ($scope,$cookies,awsApi) {
        $scope.files = [];

        angular.forEach($cookies, function(name, id){
            if(id!="username"){
                //var hyphen_index = name.indexOf('-');
                //value.name = value.substr(hyphen_index + 1, value.length - hyphen_index - 2);

                var video = awsApi.getFile(id);
                console.log(video);
                $scope.files.push(video);


            }
        })
    }]);