module.exports = function(mongoose){
    var post = new mongoose.Schema({
        post: String,
        postBy : Object,
        post_date : String
    });
    return mongoose.model('post', post);     
}
