let ngs = require('nodejs-game-server');
let ngsChat = new require('ngs-chat')(ngs.lobby);

ngs.Game.prototype.startGame(function() {
	/* Do something to start the Game */
});

ngs.Game.prototype.shouldStartGame = function() {
	/* Define When you should start a game */
};

ngs.Game.events.push({
	name: "eventName",
	body: function(socket, data) {
		/* Event functionality */
	}
});

ngs.lobby.onConnection(function(socket) {
	/* Do something when a client connects */
});

ngs.lobby.events.push({
	name: "eventName",
	body: function(socket, data) {
		/* Event functionality */
	}
});

ngs.init();