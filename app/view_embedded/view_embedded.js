/**
 * Created by Q on 4/4/2015.
 */
angular.module('transcoding-ui.view_embedded', ['ngRoute', 'ui.bootstrap', 'ngCookies'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/embedded/:id', {
            templateUrl: 'view_embedded/view_embedded.html',
            controller: 'ViewEmbeddedCtrl'
        });
    }])

    .controller('ViewEmbeddedCtrl', ['$scope','$cookies','awsApiService','$routeParams' ,function ($scope,$cookies,awsApi,$routeParams) {
        $scope.video = {
    id: "",
    name: "",
    duration: 0,
    original: "",
    mp4: "",
    webm: "",
    progress: 0
};
        awsApi.getFile($routeParams.id).$promise.then(function(data){
            $scope.video = data;
        });
    }]);
