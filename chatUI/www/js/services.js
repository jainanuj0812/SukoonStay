var services = angular.module('services', []);

services.service('callApi', function(APIServices){
    this.isAuthenticated = function(data) {
       var url = "/isAuthenticated";
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
});