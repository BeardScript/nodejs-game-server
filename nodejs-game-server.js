const Game = require('./game');
const Player = require('./Player')
const Lobby = require('./lobby');

function NodeJSGameServer() 
{
	this.lobby = Lobby;

	this.Game = Game;

	this.Player = Player;

	this.events = [];

	this.init = (callback) => 
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
		    gs.onConnection(socket);

		    this.loadServerEvents(socket);
			this.loadGameEvents(socket);
			this.loadLobbyEvents(socket);
		});

		if (callback && typeof(callback) === "function")
			callback();
	};

	this.loadServerEvents = function(socket)
	{
	    for(let event in this.events)
		{
		    socket.on(event.name, function(data){
		    	event.body(socket, data);
		    });
		}
	};

	this.loadGameEvents = function(socket)
	{
		for(let event in this.Game.events)
		{
			let game = this.lobby.getGame(socket.id);

		    socket.on(event.name, function(data){
		    	game.events[event].body(socket, data);
		    });
		}
	};

	this.loadLobbyEvents = function(socket)
	{
		for(let event in this.lobby.events)
		{
		    socket.on(event.name, function(data){
		    	event.body(socket, data);
		    });
		}
	};

	return this;
};

module.exports = NodeJSGameServer;