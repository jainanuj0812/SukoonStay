module.exports = function (mongoose, userModel, userPostModel) {
    return {
        getUserProfile  : function(req, res, next) {
            userModel.findById({'_id' : req.user._id}, function (err, doc) {
                if (err) {
                    
                } else {
                    res.json({
                        userProfile : doc
                    });
                    res.status(200).end();            
                }
            });            
        },
        updateUserProfile : function(req, res, next) {
            var user = JSON.parse(req.query.user);
            userModel.findOneAndUpdate({'profileID' : user.profileID}, user, {new : true}, function (err, doc) {
                if (err) {
                    
                } else {
                    res.json({
                        userProfile : doc
                    });
                    res.status(200).end();               
                }
            });
        },
        addPost : function(req, res, next) {
            var post = JSON.parse(req.query.postMap);
            var newPost = new userPostModel(post);
            newPost.save(function(err, doc){
                if (err) {
                    
                } else {
                    userPostModel.find({}, function(err, doc){
                        if (err) {
                            
                        } else {
                            res.json({
                                posts : doc
                            });
                            res.status(200).end();
                        }
                    })
                }
            })
        },
        getPosts : function(req, res, next) {
            userPostModel.find({}, function(err, doc){
                if (err) {
                    
                } else {
                    res.json({
                        posts : doc
                    });
                    res.status(200).end();
                }
            });
        },
        getUserDetails : function(req, res, next) {
            
        }
    }   
    
}