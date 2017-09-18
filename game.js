function Game(id)
{
	this.id = id;
	this.players = [];
	this.characters = [];
	this.status = "waiting";
};

Game.prototype.startGame = (gl, socket) => {
	if(this.shouldStartGame(gl, socket))
		gl.startGame();
};

Game.prototype.shouldStartGame = (gl, socket) => {
	if(gl.shouldStartGame(this, socket))
		return true;

	return false;
};

module.exports = Game;