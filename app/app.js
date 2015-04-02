'use strict';

// Declare app level module which depends on views, and components
angular.module('transcoding-ui', [
  'ngRoute',
  'ui.bootstrap',
  'ngCookies',
  'transcoding-ui.directives',
  'transcoding-ui.view_form'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view_form'});
}]);
