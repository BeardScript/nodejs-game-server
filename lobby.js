const Game = require('./game');

function Lobby()
{
	this.playersCount = 0;

	this.players = [];
	this.playerPositions = [];

	this.games = [];
	this.gamePositions = [];

	this.availableGame = {};

	this.availableUserGames = [];

	this.gameTypes = [];

	this.addPlayer = function() {

	};

	this.removePlayer = function() {

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