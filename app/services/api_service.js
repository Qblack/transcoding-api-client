/**
 * Created by Q on 4/2/2015.
 */


var awsApi = angular.module('awsApi', []);

awsApi.factory('awsApiService', ['$resource', function($resource) {

    var api_url = 'www.api.com/api';
    var Video = $resource(api_url+'/video/:id',{id:'@id'},
        {
            'post':  { method: 'POST' },
            'get':   { method: 'GET', isArray: true }
        }
    );


    this.getVideo = function(id){
        var video = Video.get({id:id},
            function(data){
                video.id = data.id;
                video.name =data.name;
                video.duration = data.duration;
                video.original = data.original;
                video.mp4 = data.mp4;
                video.webm = data.webm;
                video.progress = data.progress;
        });
        return video;
    };

    this.postVideo = function(name){
      var video = Video.post()
        // finsh?
    };

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