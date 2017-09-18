function NGSChat (sl) 
{
	this.subcribe = (socket, room) =>{
		socket.join(room);
	};

	this.unsubscribe = (socket, room) =>{
		socket.leave(room);
	};

	this.events = [
		sendMessage: {
			name: "message",
			body: (socket, data, gs) =>{
				socket.broadcast.to(data.room).emit('message', data.message);
			}
		},
		sendPrivateMessage: {
			name: "pvtMessage",
			body: (socket, data, gs) =>{
				socket.to(data.id).emit('message', data.message);
			}
		}
	];

	sl.events = sl.events.concat(this.events);
};

module.exports = NGSChat;