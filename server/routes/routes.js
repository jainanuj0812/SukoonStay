module.exports = function(express, app, passport, config){
    var router = express.Router();
    
    router.get('/auth/facebook', passport.authenticate('facebook'));
    
    router.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect : config.redirectURL.success,
        failureRedirect : config.redirectURL.failure
    }));
    
    app.use('/', router);
}