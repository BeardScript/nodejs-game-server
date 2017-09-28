const lobby = require('./lobby');
const Game = require('./game');
const Player = require('./Player');

function NodeJSGameServer() 
{
	let events = [
		{
			name: "disconnect",
			body: function(socket){
				onPlayerDisconnected(socket);
			}
		},
		{
			name: "login",
			body: function(socket, data){
				onLogin(socket, data);
			}
		}
	];

	this.playersCount = lobby.playersCount;

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

	this.getPlayers = function()
	{
		return lobby.players;
	};

	this.init = function(callback) 
	{
		const app = require('express')();
		const server = require('http').Server(app);
		const io = require('socket.io')(server);
		const port = process.env.PORT || 3000;

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
		console.log('user connected: '+ socket.id);
		socket.emit("connected");
	}

	function loadEvents(socket)
	{
	    for(let i = 0; i < events.length; i++)
		{
		    socket.on(events[i].name, function(data){
		    	events[i].body(socket, data);
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
		let playerData = undefined;

		if (onLoginCallback && typeof(onLoginCallback) === "function")
		playerData = onLoginCallback(socket, data);

		if(playerData === undefined)
			return;

		const player = new Player(socket.id, playerData);
		lobby.addPlayer(socket, player);

		socket.emit('loggedIn', player);
	}

	this.createGame = function(socket, data, callback)
	{
		let game = lobby.createGame(socket, data);
		let player = lobby.players[socket.id];

		game.addPlayer(player);

		callback(game);
	}

	this.joinGame = function(socket, callback)
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
		let player = lobby.removePlayer(socket);

		if (onPlayerDisconnectedCallback && typeof(onPlayerDisconnectedCallback) === "function")
			onPlayerDisconnectedCallback(socket, player);
	}

	return this;
}

module.exports = NodeJSGameServer();