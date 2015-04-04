/**
 * Created by Q on 4/1/2015.
 */
'use strict';

angular.module('transcoding-ui.view_form', ['ngRoute', 'ui.bootstrap', 'ngCookies'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/upload', {
            templateUrl: 'view_form/view_form.html',
            controller: 'ViewFormCtrl'
        });
    }])

    .controller('ViewFormCtrl', ['$scope','$cookies','$cookieStore','awsApiService',function ($scope,$cookies,$cookieStore, awsApi) {

        $scope.creds = {
            bucket: 'elasticbeanstalk-us-west-2-030951249387',
            access_key: 'AKIAJTRF5AS2EXXYYRJQ',
            secret_key: '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'
        };

        $scope.sizeLimit      = 10585760; // 10MB in Bytes
        $scope.uploadProgress = 0;
        $scope.type = 'info';
        $scope.active = 'active';



        $scope.upload = function() {
            AWS.config.update({ accessKeyId: $scope.creds.access_key, secretAccessKey: $scope.creds.secret_key });
            AWS.config.region = 'us-west-2';
            var bucket = new AWS.S3({ params: { Bucket: $scope.creds.bucket } });

            if($scope.file) {
                // Perform File Size Check First
                var fileSize = Math.round(parseInt($scope.file.size));
                if (fileSize > $scope.sizeLimit) {
                    alert('Sorry, your attachment is too big. <br/> Maximum '  + $scope.fileSizeLabel() + ' file attachment allowed');
                    return false;
                }
                // Prepend Unique String To Prevent Overwrites
                $scope.uniqueFileName = $scope.uniqueString() + '-' + $scope.file.name;

                var params = { Key: $scope.uniqueFileName, ContentType: $scope.file.type, Body: $scope.file, ServerSideEncryption: 'AES256' };

                bucket.putObject(params, function(err, data) {
                    if(err) {
                        alert(err.code + ': ' +err.message);
                        return false;
                    }
                    else {
                        // Upload Successfully Finished
                        //fix id generation
                        var id = 0;
                        awsApi.postVideo(JSON.stringify({'url':$scope.getFileUrl()})).$promise.then(function(response){
                            id = response.id;
                            $cookieStore.put(id,$scope.uniqueFileName);
                        });

                        // Reset The Progress Bar
                        setTimeout(function() {
                            $scope.uploadProgress = 0;
                            $scope.type = 'info';
                            $scope.active = 'active';
                            $scope.$digest();
                        }, 4000);
                    }
                })
                    .on('httpUploadProgress',function(progress) {
                        $scope.uploadProgress = Math.round(progress.loaded / progress.total * 100);
                        if ($scope.uploadProgress ==100) {
                            $scope.type = 'success';
                            $scope.active = '';
                        }
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
        };

        $scope.getFileUrl = function(){
            return $scope.creds.bucket +'/'+ $scope.uniqueFileName;
        };




    }]);