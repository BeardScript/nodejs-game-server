const Game = require('./game');

function Lobby()
{
	this.playersCount = 0;

	this.players = [];
	this.playerPositions = [];

	this.games = [];
	this.gamePositions = [];

	this.availableGame = {};

	this.events = [];

	this.onConnection = (socket) => {

	};

	this.createPlayer = (socket) => {

	};

	this.addPlayer = (socket) => {

	};

	this.removePlayer = () => {

	};

	this.createGame = () => {

	};

	this.getGame = () => {
		
	};

	this.getAvailableGames = () => {

	};

	this.joinGame = () => {

	};

	this.removeGame = () => {

	};

	return this;
};

module.exports = Lobby;