module.exports = function(mongoose){
    var chatUser = new mongoose.Schema({
        profileID: String,
        fullname : String,
        profilePic : String,
        emailId : String,
        secEmailId : String,
        phone : String
    });
    return mongoose.model('chatUser', chatUser);     
}
