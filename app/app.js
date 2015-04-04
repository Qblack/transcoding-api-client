'use strict';

// Declare app level module which depends on views, and components
angular.module('transcoding-ui', [
  'ngRoute',
  'ui.bootstrap',
  'ngCookies',
  'ngResource',
  'LocalStorageModule',
  'transcoding-ui.directives',
  'transcoding-ui.view_form',
  'transcoding-ui.view_history',
  'transcoding-ui.view_login',
  'transcoding-ui.view_home',
  'awsApi'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});

}]).config(['$resourceProvider', function($resourceProvider) {
  // Don't strip trailing slashes from calculated URLs
  $resourceProvider.defaults.stripTrailingSlashes = false;
}]);
