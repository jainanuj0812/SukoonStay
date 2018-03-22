module.exports = function(io, chatRoomModel) {
	var rooms = [];
	
	chatRoomModel.find({}, function(error, availableChatRooms) {
		for(i=0; i<availableChatRooms.length; i++){
			
			rooms.push({createdBy:availableChatRooms[i].createdBy, roomId: availableChatRooms[i].roomId, roomName:availableChatRooms[i].roomName, roomLogo: availableChatRooms[i].roomLogo, description: availableChatRooms[i].description});
		}

		var chatrooms = io.of('/chatRooms');
		chatrooms.on('connection', function(socket){
			console.log('Accepted connection for Chatrooms');
			socket.emit('roomUpdate', JSON.stringify(rooms));

			socket.on('newRoom', function(data) {
				rooms.push(data);
				socket.emit('roomUpdate', JSON.stringify(rooms));
				socket.broadcast.emit('roomUpdate', JSON.stringify(rooms));
				var newRoom = new chatRoomModel({
					roomId: data.roomId,
					roomName: data.roomName,
					roomLogo: data.roomLogo,
					description: data.description,
					createdBy: data.createdBy
				});
				newRoom.save();
			});
		});

		var messages = io.of('/messages');
		messages.on('connection', function(socket){
			console.log('Accepted connection in room');
			var currentRoom = '';
			socket.on('joinroom', function(data){
				socket.userId = data.userId;
				socket.userName = data.userName;
				socket.profilePic = data.profilePic;
				socket.join(data.roomId);
				currentRoom = data.roomId;
				//broadcast the updated userlist
				updateUserList(data.roomId, true);

			});
			socket.on('disconnect', function(){
				console.log('Client disconnected from: ', currentRoom);
				//wait for some time before emitting updated list as list of  connected clients is refreshed after some time
				//above decision was made on experience basis
				setTimeout(function(){ updateUserList(currentRoom, true); }, 3000);
			});

			socket.on('newMessage', function(data) {
				socket.broadcast.to(data.roomId).emit('messageFeed', JSON.stringify(data));
			})

			socket.on('getUserUpdateFeed', function(data) {
				updateUserList(data.roomId, false);
			})
			socket.on("typing", function(data) {
				socket.broadcast.to(currentRoom).emit("isTyping", {isTyping: data.status, userId: data.userId});
			});
			//userlist update can be of 2 type: on-demand for particluar client & forcefully update all when new user joins
			function updateUserList(roomId, updateAll) {
				var clients = io.of('/messages').clients(roomId);

				var userList = [];
				for(i=0;i<clients.length;i++) {
					userList.push({userId:clients[i].userId,userName: clients[i].userName, profilePic: clients[i].profilePic});	
				}
				//emit  back to the user in the room who requested this data
				messages.to(roomId).emit('userUpdateFeed', JSON.stringify(userList));
				
				//emit back to all in the room
				if(updateAll) {
					socket.broadcast.to(roomId).emit('userUpdateFeed', JSON.stringify(userList));
				}
			}
		});
	});
}