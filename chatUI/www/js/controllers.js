/* global angular, document, window */
'use strict';

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout, callApi, $window) {
    
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };
})

.controller('LoginCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk, $state, $window) {
    
    $scope.doAuth = function(){
        var url = 'http://localhost:3000/auth/facebook';
        
        if($window.cordova) {
            url += '?redirect' + encodeURIComponent('http://i.imug.com/XseoGPD.png');
        } else {
            url += '?redirect' + encodeURIComponent(window.location.href);   
        }
        
        var ref = window.open(url, '_blank', 'location=no');
        
        ref.addEventListener('loadstop', function(ev) {
            if(ev.url.indexOf('/auth/facebook') == -1) {
                ref.close();
                $state.go('app.profile');
                
            }
        })
        
        ref.onload = function(ev){
            ref.close();
            $state.go('app.profile');
        }
        
           /*console.log("called");
           var resource = callApi.doAuth();
            resource.get({}, function(){
                
            }, function(){
                
            })*/
              
              
    }
    
    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();
})

.controller('FriendsCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setHeaderFab('left');

    // Delay expansion
    $timeout(function() {
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
    }, 300);

    // Set Motion
    ionicMaterialMotion.fadeSlideInRight();

    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('ProfileCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, callApi, pojoFactory) {
    // Set Header
    //getUserData
    
    var user = pojoFactory.getUser();
    user.$promise.then(function(res){
        $scope.user = res.userProfile;
    });
    
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('ActivityCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, callApi, pojoFactory) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');
    $scope.post = '';

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
    
    var user = pojoFactory.getUser();
    user.$promise.then(function(res){
        $scope.user = res.userProfile;
    });
    
    $scope.getPost = function() {
        var resource = callApi.getPosts();
        resource.get({}, function(res){
            $scope.posts = res.posts;
        }, function(err){
            
        });
    }
    $scope.getPost();
    
    $scope.addPost = function(post) {
        var postMap = {'post': post, 'postById' : $scope.user._id, 'post_date' : new Date()}
        var resource = callApi.addPost();
        resource.get({postMap}, function(res){
            $scope.posts = res.posts;
        }, function(err){
            
        });
    }
})

.controller('GalleryCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab(false);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });

})

.controller('UpdateProfileCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, callApi, pojoFactory) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(true);
    
    var user = pojoFactory.getUser();
    user.$promise.then(function(res){
        $scope.user = res.userProfile;
    });
    
    $scope.updateProfile  = function(user) {
        var resource = callApi.updateUserProfile();
        resource.get({user}, function(res){
            $scope.user = res.userProfile;
        }, function(err){
            
        });
    }
    
     ionicMaterialInk.displayEffect();
}).factory('pojoFactory', function(callApi) {
    var user = {};
    return {
        getUser : function() {
            if (user) {
                var resource = callApi.getUserProfile();
                user = resource.get({}, function(res){
                    
                }, function(err){
            
                }); 
                return user;
            } else {
                return user;
            }
        }
    }
});
