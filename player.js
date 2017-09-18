function Player(sid, data)
{
	this.sid = sid;
	this.data = data;
	this.activeGameId = undefined;
};

module.exports = Player;