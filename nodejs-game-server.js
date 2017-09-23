const lobby = require('./lobby');
const Game = require('./game');
const Player = require('./Player');

function NodeJSGameServer() 
{
	let events = [];

	this.createEvent = function (name, callback)
	{
		events.push({
			name: name,
			body: function(socket, data) {
				callback(socket, data);
			}
		});
	}

	this.defineGame = function (callback)
	{
		let game = new Game();
		callback(game);
		lobby.gameTypes.push(game);

		return game;
	};

	this.init = function(callback) 
	{
		const server = require('express').express();
		let io = require('socket.io')(server);
		let port = process.env.PORT || 3000;

		server.listen(port, function()
		{
			console.log ('Server listening on port ' + port);
		});

		io.sockets.on('connection', function(socket)
		{
		    onConnection(socket);
		    loadEvents(socket);
		});

		if (callback && typeof(callback) === "function")
			callback();
	};

	function onConnection(socket)
	{

	};

	function loadEvents(socket)
	{
	    for(let event in events)
		{
		    socket.on(event.name, function(data){
		    	event.body(socket, data);
		    });
		}
	};

	return this;
};

module.exports = NodeJSGameServer();