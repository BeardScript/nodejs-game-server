function Game(id)
{
	this.id = id;
	this.players = [];
	this.characters = [];
	this.status = "waiting";
};

Game.prototype.startGame = (socket) => {
	
};

Game.prototype.shouldStartGame = (socket) => {
	
};

module.exports = Game;