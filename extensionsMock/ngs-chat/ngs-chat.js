function NGSChat (ngs) 
{
	this.subcribe = (socket, room) =>{
		socket.join(room);
	};

	this.unsubscribe = (socket, room) =>{
		socket.leave(room);
	};

	ngs.createEvent("message", function(socket, data){
		socket.broadcast.to(data.room).emit('message', data.message);
	});

	ngs.createEvent("pvtmessage", function(socket, data){
		socket.to(data.id).emit('pvtmessage', data.message);
	});
}

module.exports = NGSChat;