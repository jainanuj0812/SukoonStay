module.exports = function (config, userModel, userPostModel, chatRoomModel, formidable, util, fs) {
    var formidable = require('formidable'),
    util = require('util'),
    fs = require('fs-extra');
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
        getChatRooms : function(req, res, next) {
            chatRoomModel.find({}, function(err, doc){
                if (err) {
                    
                } else {
                    res.json({
                        posts : doc
                    });
                    res.status(200).end();
                }
            });
        },
        uploadProfilePic : function(req, res, next) {
            var form = new formidable.IncomingForm();

            form.parse(req, function(err, fields, files) {
            
            });
        
            var formFields = [];
            form.on('field', function(key, value) {
                formFields[key] = value;
            })
            
            form.on('end', function(fields, files) {    
                var temp_path = this.openedFiles[0].path;
                
                var file_name = req.user._id+Date.now()+".png";
                console.log("===", file_name);
                
                var new_location = './public/images/'+file_name;
                var store_location = config.host+'/images/'+file_name;
 
                fs.copy(temp_path, new_location, function(err) {  
                    if (err) {
                        console.error(err);
                    } else {
                        console.log("success!");
                        
                        userModel.findOneAndUpdate({'profileID' : req.user.profileID}, {profilePic : store_location}, {new : true}, function (err, doc) {
                            if (err) {
                            
                            } else {
                                res.json({
                                    userProfile : doc
                            });
                                res.status(200).end();               
                            }
                        });
                    }
                });
            })
        },
        getUserDetails : function(req, res, next) {
            
        }
    }   
    
}