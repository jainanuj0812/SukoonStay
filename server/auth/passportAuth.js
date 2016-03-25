module.exports = function(passport, FacebookStrategy, config, mongoose){
   
    var chatUser = new mongoose.Schema({
        profileID: String,
        fullname : String,
        profilePic : String
    });
    
    var userModel = mongoose.model('chatUser', chatUser);
    
    passport.serializeUser(function(user, done){
        done(null, user.id);
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
       profileFields : ['id', 'displayName', 'photos']
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
                    profilePic : profile.photos[0].value || ''
                });
                
                newChatUser.save(function(){
                    done(null, newChatUser);
                });
            }
        })
       
   })); 
}