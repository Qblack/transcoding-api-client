/**
 * Created by Q on 4/1/2015.
 */

'use strict';

angular.module('transcoding-ui.directives',[])
    .directive('file', function() {
        return {
            restrict: 'AE',
            scope: {
                file: '@'
            },
            link: function(scope, el, attrs){
                el.bind('change', function(event){
                    var files = event.target.files;
                    var file = files[0];
                    scope.file = file;
                    scope.$parent.file = file;
                    scope.$apply();
                });
            }
        };
});