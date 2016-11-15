var services = angular.module('services', []);

services.service('callApi', function(APIServices, $http){
    this.isAuthenticated = function(data) {
       var url = "/isAuthenticated";
       return APIServices.getResource(url, data);
    };
    this.logout = function(data) {
       var url = "/logout";
       return APIServices.getResource(url, data);
    };
    this.getUserProfile = function(data) {
       var url = "/getUserProfile";
       return APIServices.getResource(url, data);
    };
    this.updateUserProfile = function(data) {
       var url = "/updateUserProfile";
       return APIServices.getResource(url, data);
    };
    this.addPost = function(data) {
       var url = "/addPost";
       return APIServices.getResource(url, data);
    };
    this.getPosts = function(data) {
       var url = "/getPosts";
       return APIServices.getResource(url, data);
    };
    this.getUserDetails = function(data) {
       var url = "/getUserDetails";
       return APIServices.getResource(url, data);
    };
    this.uploadProfilePic = function(file){
        var fd = new FormData();
        var url  = "/uploadProfilePic"
        fd.append('file', file[0]);
        console.log(file[0]);
        return $http.post(url, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
    }
});