const lobby = require('./lobby');
const Game = require('./game');
const Player = require('./Player');

function NodeJSGameServer() 
{
	let events = [
		{
			name: "disconnect",
			body: function(socket)
			{
				onPlayerDisconnected(socket);
			}
		},
		{
			name: "login",
			body: function(socket, data)
			{
				onLogin(socket, data);
			}
		}
	];

	this.createEvent = function (name, callback)
	{
		events.push({
			name: name,
			body: function(socket, data) {
				callback(socket, data);
			}
		});
	};

	this.defineGame = function (callback)
	{
		let game = new Game();
		callback(game);
		lobby.gameTypes.push(game);

		return game;
	};

	this.getGameByPlayer = function(playerId)
	{
		return lobby.getGameByPlayer(playerId);
	};

	this.getPlayer = function(playerId)
	{
		return lobby.players[playerId];
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
		socket.emit("connected");
	}

	function loadEvents(socket)
	{
	    for(let event in events)
		{
		    socket.on(event.name, function(data){
		    	event.body(socket, data);
		    });
		}
	}

	let onLoginCallback;

	this.onLogin = function (callback)
	{
		onLoginCallback = callback;
	};

	function onLogin(socket, data)
	{
		const playerData = onLoginCallback(socket, data);

		if(playerData === undefined)
			return;

		const player = new Player(socket.id, playerData);
		lobby.addPlayer(player);
	}

	this.onCreateGame = function(socket, callback)
	{
		let game = lobby.createGame(socket, data);
		let player = lobby.players[socket.id];

		game.addPlayer(player);

		callback(game);
	}

	this.onJoinGame = function(socket, callback)
	{
		let game = lobby.getGame(data.id);
		lobby.joinGame(socket, game);

		callback(game);
	}

	this.availableUserGames = lobby.availableUserGames;

	let onPlayerDisconnectedCallback;

	this.onPlayerDisconnected = function(callback)
	{
		onPlayerDisconnectedCallback = callback;
	};

	function onPlayerDisconnected(socket)
	{
		let player = lobby.players[socket.id];
		onPlayerDisconnectedCallback(socket, player);
	}

	return this;
}

module.exports = NodeJSGameServer();