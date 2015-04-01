'use strict';

// Declare app level module which depends on views, and components
angular.module('transcoding-ui', [
  'ngRoute',
  'ui.bootstrap',
  'myApp.view_form',
  'myApp.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view_form'});
}]);
