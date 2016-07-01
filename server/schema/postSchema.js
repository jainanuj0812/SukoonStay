module.exports = function(mongoose){
    var post = new mongoose.Schema({
        post: String,
        postById : String,
        post_date : String
    });
    return mongoose.model('post', post);     
}
