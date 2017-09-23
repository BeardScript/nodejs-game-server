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
			body: (socket, data) => {
				socket.broadcast.to(data.room).emit('message', data.message);
			}
		},
		{
			name: "pvtMessage",
			body: (socket, data) =>{
				socket.to(data.id).emit('pvtmessage', data.message);
			}
		}
	];

	ngs.events = ngs.events.concat(this.events);
};

module.exports = NGSChat;