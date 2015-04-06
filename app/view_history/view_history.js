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

    .controller('ViewHistoryCtrl', ['$scope','localStorageService','awsApiService','$window' ,function ($scope,localStorage,awsApi,$window) {
        $scope.files = {};
        $scope.timers = {};
        $scope.has_files = false;

        angular.forEach(localStorage.keys(), function( id){
            if(id!="user" && id!='sessionId'){
                awsApi.getFile(id).$promise.then(function(video) {
                    $scope.files[id] = video;
                    $scope.timers[id] = id;
                    $scope.has_files = true;
                });
            }
        });

        $scope.deleteFile = function(id){
            localStorage.remove(id);
            delete $scope.files[id];
        };

        $scope.updateProgress = function(id){
            awsApi.getFile(id).$promise.then(function(video) {
                $scope.files[id].progress = video.progress;
                $scope.files[id].mp4 = video.mp4;
                $scope.files[id].webm = video.webm;
            });
        };

        $scope.updateAll = function(){
            angular.forEach($scope.timers, function(name, id){
              if($scope.files[id].progress<100) {
                $scope.updateProgress(id);
              }else{
                delete $scope.timers[id];
              }
            });
        };
        setInterval($scope.updateAll,1000);



    }]);
