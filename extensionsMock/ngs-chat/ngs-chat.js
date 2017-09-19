function NGSChat (ngs) 
{
	this.subcribe = (socket, room) =>{
		socket.join(room);
	};

	this.unsubscribe = (socket, room) =>{
		socket.leave(room);
	};

	this.events = [
		{
			name: "message",
			body: (socket, data, gs) =>{
				socket.broadcast.to(data.room).emit('message', data.message);
			}
		},
		{
			name: "pvtMessage",
			body: (socket, data, gs) =>{
				socket.to(data.id).emit('message', data.message);
			}
		}
	];

	ngs.events = ngs.events.concat(this.events);
};

module.exports = NGSChat;