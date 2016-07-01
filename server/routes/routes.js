module.exports = function(express, app, passport, config, userModel, userPostModel){
    var router = express.Router();
    var user = require('../api/userProfile.js')(mongoose, userModel, userPostModel);
    router.get('/auth/facebook', passport.authenticate('facebook', { scope: [ 'email' ] }));
    
    router.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect : config.redirectURL.success,
        failureRedirect : config.redirectURL.failure
    }));
    
    router.get('/getUserProfile', isLoggedIn, user.getUserProfile, function(req, res, next){
        
    });
    
    router.get('/updateUserProfile', isLoggedIn, user.updateUserProfile, function(req, res, next){
        
    });
    
    router.get('/addPost', isLoggedIn, user.addPost, function(req, res, next){
        
    });
    
    router.get('/getPosts', isLoggedIn, user.getPosts, function(req, res, next){
        
    });
    
    router.get('/getUserDetails', isLoggedIn, user.getUserDetails, function(req, res, next){
        
    });
    
    app.use('/', router);
    function isLoggedIn(req, res, next) {
        if(req.isAuthenticated()) {
            return next();
        } else {
            res.json({
                isAuth : false
            })
            res.status(200).end();
        }
    }
}
