module.exports = function (config, chatRoomModel) {
    return {
        getChatRooms  : function(req, res, next) {
            chatRoomModel.find({}, function (err, doc) {
                if (err) {
                    
                } else {
                    res.json({
                        chatRooms : doc
                    });
                    res.status(200).end();            
                }
            });            
        }
    }
}