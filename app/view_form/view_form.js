/**
 * Created by Q on 4/1/2015.
 */
'use strict';

angular.module('transcoding-ui.view_form', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view_form', {
            templateUrl: 'view_form/view_form.html',
            controller: 'ViewFormCtrl'
        });
    }])

    .controller('ViewFormCtrl', [function() {

    }]);