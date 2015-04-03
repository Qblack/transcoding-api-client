/**
 * Created by Q on 4/2/2015.
 */

angular.module("transcoding-ui.view_home",['ngRoute', 'ui.bootstrap'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'view_home/view_home.html',
            controller: 'ViewHomeCtrl'
        });
        $routeProvider.when('/home', {
            templateUrl: 'view_home/view_home.html',
            controller: 'ViewHomeCtrl'
        });

    }])
    .controller("ViewHomeCtrl",[function(){}]);