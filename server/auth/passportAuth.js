module.exports = function(passport, FacebookStrategy, config, mongoose, userModel){
    passport.serializeUser(function(user, done){
        done(null, user);
    });
    
    passport.deserializeUser(function(id, done){
        userModel.findById(id, function(err, user){
            done(null, id);    
        });     
    });
    
    passport.use(new FacebookStrategy({
       clientID : config.fb.appID,
       clientSecret : config.fb.appSecret,
       callbackURL : config.fb.callbackURL,
       profileFields : ['id', 'displayName', 'photos', 'emails']
   }, function(accessToken, refreshToken, profile, done){
      //chech if user exist in database 
       //if not return one and make a profile, if exist return the profile
        userModel.findOne({'profileID': profile.id}, function(err, result){
            if(result) {
                done(null, result);
            } else {
                //Create a nre user in mongo lab account
                var newChatUser = new userModel({
                    profileID : profile.id,
                    fullname : profile.displayName,
                    emailId: profile.emails[0].value,
                    profilePic : profile.photos[0].value || ''
                });
                
                newChatUser.save(function(){
                    done(null, newChatUser);
                });
            }
        })
       
   })); 
}