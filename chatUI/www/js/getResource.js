var resources = angular.module('getResource', []);

resources.factory('APIServices', function($resource, $http){
    return {
       getResource: function(url, data) {
          
           return $resource(url, data); 
       }
    }
    
});