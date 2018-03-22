module.exports = function(express, app, passport, config, userModel, userPostModel, chatRoomModel){
    var router = express.Router();
    var user = require('../api/userProfile.js')(config, userModel, userPostModel, chatRoomModel);
    var chat = require('../api/chatRooms.js')(config, chatRoomModel);
    
    router.get('/auth/facebook', passport.authenticate('facebook', { scope: [ 'email' ] }));
    
    router.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect : config.redirectURL.success,
        failureRedirect : config.redirectURL.failure
    }));
    
    router.get('/logout', function(req, res, next){
        req.logout();
        res.status(200).end();
    });
    
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
    router.post('/uploadProfilePic', isLoggedIn, user.uploadProfilePic, function(req, res, next){
        
    });
    router.get('/chatRooms', isLoggedIn, chat.getChatRooms, function(req, res, next){
        
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
