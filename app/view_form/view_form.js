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

    .controller('ViewFormCtrl', ['$scope',function ($scope) {
        $scope.creds = {
            bucket: 'elasticbeanstalk-us-west-2-030951249387',
            access_key: 'AKIAIET2XYL5I5FPCMBA',
            secret_key: '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'
        };

        $scope.sizeLimit      = 10585760; // 10MB in Bytes
        $scope.uploadProgress = 0;

        $scope.upload = function() {
            AWS.config.update({ accessKeyId: $scope.creds.access_key, secretAccessKey: $scope.creds.secret_key });
            AWS.config.region = 'us-west-2';
            var bucket = new AWS.S3({ params: { Bucket: $scope.creds.bucket } });

            if($scope.file) {
                // Perform File Size Check First
                var fileSize = Math.round(parseInt($scope.file.size));
                if (fileSize > $scope.sizeLimit) {
                    alert.error('Sorry, your attachment is too big. <br/> Maximum '  + $scope.fileSizeLabel() + ' file attachment allowed');
                    return false;
                }
                // Prepend Unique String To Prevent Overwrites
                var uniqueFileName = $scope.uniqueString() + '-' + $scope.file.name;

                var params = { Key: uniqueFileName, ContentType: $scope.file.type, Body: $scope.file, ServerSideEncryption: 'AES256' };

                bucket.putObject(params, function(err, data) {
                    if(err) {
                        alert(err.code + ': ' +err.message);
                        return false;
                    }
                    else {
                        // Upload Successfully Finished
                        alert('File Uploaded Successfully');

                        // Reset The Progress Bar
                        setTimeout(function() {
                            $scope.uploadProgress = 0;
                            $scope.$digest();
                        }, 4000);
                    }
                })
                    .on('httpUploadProgress',function(progress) {
                        $scope.uploadProgress = Math.round(progress.loaded / progress.total * 100);
                        $scope.$digest();
                    });
            }
            else {
                // No File Selected
                alert('Please select a file to upload');
            }
        };

        $scope.fileSizeLabel = function() {
            // Convert Bytes To MB
            return Math.round($scope.sizeLimit / 1024 / 1024) + 'MB';
        };

        $scope.uniqueString = function() {
            var text     = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for( var i=0; i < 8; i++ ) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
        }


    }]);