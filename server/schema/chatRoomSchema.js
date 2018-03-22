module.exports = function(mongoose){
    var chatrooms = new mongoose.Schema({
        roomId: String,
		roomName: String,
		roomLogo: String,
		description: String,
		createdBy: String
    });
    return mongoose.model('chatrooms', chatrooms);     
}