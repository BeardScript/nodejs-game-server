let ngs = require('nodejs-game-server');
let ngsChat = new require('ngs-chat')(ngs);

ngs.defineGame(function(game){
	game.myAwesomeMethod = function(socket){
		ngsChat.subscribe(socket, "someTeamChat");
	};
	game.myAwesomeProperty = "propertyValue";
});

ngs.createEvent("eventName", function(socket, data){
	let game = ngs.getGameByPlayer(socket.id);
	game.myAwesomeMethod(socket);
});

ngs.init();