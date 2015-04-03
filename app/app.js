'use strict';

// Declare app level module which depends on views, and components
angular.module('transcoding-ui', [
  'ngRoute',
  'ui.bootstrap',
  'ngCookies',
  'transcoding-ui.directives',
  'transcoding-ui.view_form',
  'transcoding-ui.view_history',
  'transcoding-ui.view_login',
  'transcoding-ui.view_home'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});
}]);
