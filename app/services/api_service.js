/**
 * Created by Q on 4/2/2015.
 */


var awsApi = angular.module('awsApi', []);

awsApi.factory('awsApiService', ['$resource', function($resource) {
    var service = {};
    var api_url = 'http://127.0.0.1:1337';
    var Video = $resource(api_url+'/videos/:id',{id:'@id'},
        {
            'post':  { method: 'POST' },
            'get':   { method: 'GET', isArray: false }
        }
    );

    service.getFile = function(id){
        return Video.get({id: id});
    };

    service.postVideo = function(){
      return Video.post();
    };
    return service;

}]);

//{
//    id: "7805501934",
//        name: "Hello",
//    duration: 25.5,
//    original: "input.mov",
//    mp4: "aws/1/etc/output.mp4",
//    webm: "aws/output.webm",
//    progress: 100
//}