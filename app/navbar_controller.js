/**
 * Created by Q on 4/5/2015.
 */
angular.module('transcoding-ui.navbar', [ 'ui.bootstrap', 'LocalStorageModule'])
    .controller('ViewNavBarCtrl', ['$scope','$window','localStorageService',function ($scope,$window,localStorageService) {
        $scope.username = localStorageService.get("user");
        $scope.sessionId = localStorageService.get("sessionId");

        $scope.showHome = function(){
            $scope.username = localStorageService.get("user");
            $scope.sessionId = localStorageService.get("sessionId");

            return !localStorageService.get("user");
        };

        $scope.path = function(){
            var loc = $window.location.href;
            var last = loc.substr(loc.length - 7);
            //alert(last);
            return last == 'history';
        };
    }]);
