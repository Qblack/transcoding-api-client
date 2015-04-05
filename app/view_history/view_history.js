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

        $scope.updateProgress = function(id){
            awsApi.getFile(id).$promise.then(function(video) {
                $scope.files[id].progress = video.progress;
            });
        };

        $scope.updateAll = function(){
            angular.forEach($scope.timers, function(name, id){
              if($scope.files[id].progress<100) {
                console.log('updating:' +id);
                $scope.updateProgress(id);
              }else{
                console.log("CLEAR" +id)
                delete $scope.timers[id];
              }
            });
        };
        setInterval($scope.updateAll,1000);



    }]);
