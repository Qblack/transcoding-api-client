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
        $scope.files = {};

        angular.forEach($cookies, function(name, id){
            if(id!="username"){
                awsApi.getFile(id).$promise.then(function(video) {
                    $scope.files[id] = video;
                });
            }
        });

        $scope.updateProgress = function(id){
            awsApi.getFile(id).$promise.then(function(video) {
                $scope.files[id].progress = video.progress;
            });
        };

        $scope.updateAll = function(){
            angular.forEach($scope.files, function(name, id){
                if(id!="username"){
                    if($scope.files[id].progress<100){
                        $scope.updateProgress(id);
                    }
                }
            });
        };

        setInterval($scope.updateAll,1000);

    }]);