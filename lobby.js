const Game = require('./game');

function Lobby()
{
	this.maxPlayers = 500;

	this.playersCount = 0;

	this.players = [];
	this.playersEmptyPositions = [];

	this.games = [];
	this.gamePositions = [];

	this.availableGame = {};

	this.availableUserGames = [];

	this.gameTypes = [];

	this.addPlayer = function(socket, player)
	{
		setSocketPosId(socket);
		playersCount++;
		this.players[socket.posId] = player;
	};

	function setSocketPosId(socket){
		if(playersEmptyPositions.length > 0)
			socket.posId = playersEmptyPositions.pop();
		else if(playersCount < this.maxPlayers)
			socket.posId = players.length;
	}

	this.removePlayer = function(socket) 
	{
		const player = this.players[socket.posId];
		this.players[socket.posId] = undefined;
		this.playersEmptyPositions.push(socket.posId);
		playersCount--;

		return player;
	};

	this.createGame = function() {

	};

	this.getGame = function() {
		
	};

	this.joinGame = function() {

	};

	this.removeGame = function() {

	};

	return this;
}

module.exports = Lobby();