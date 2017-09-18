function GameServer(options)
{
	this.playersCount = 0;

	this.players = [];
	this.playerPositions = [];

	this.games = [];
	this.gamePositions = [];

	this.availableGame = {};

	this.gl = options.gameLogic;
	this.sl = options.serverLogic;
	this.playerModel = options.playerModel;

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
};

module.exports = GameServer;