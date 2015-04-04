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

    .controller('ViewHistoryCtrl', ['$scope','localStorageService','awsApiService' ,function ($scope,localStorage,awsApi) {
        $scope.files = {};

        angular.forEach(localStorage.keys(), function( id){
            if(id!="user" && id!='sessionId'){
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
                if(id!="user" && id!='sessionId'){
                    if($scope.files[id].progress<100){
                        $scope.updateProgress(id);
                    }else{
                        this.clearInterval();
                    }
                }
            });
        };

        setInterval($scope.updateAll,1000);



    }]);