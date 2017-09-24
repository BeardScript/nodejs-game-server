let ngs = require('nodejs-game-server');
let ngsChat = new require('ngs-chat')(ngs);	// This is an extension.

// Defining your game
ngs.defineGame(function(game){
	//Adding functionality to your game
	game.myAwesomeMethod = function(socket){
		ngsChat.subscribe(socket, "someTeamChat");	// Using the extension.
	};
	game.myAwesomeProperty = "propertyValue";
});

//Creating Events that will be called by the client
ngs.createEvent("eventName", function(socket, data){
	let game = ngs.getGameByPlayer(socket.id);
	game.myAwesomeMethod(socket);	// Using your game functionality.
});

ngs.onLogin(function(socket, data){
	// Do something when a player Signs in.
	let playerData = {};

	return playerData // Return an object with the player's data, or undefined if player doesn't exist.
});

ngs.onGameCreated(function(socket, game){
	// Do something when a game is created.
});

ngs.onJoinGame(function(socket, game){
	// Do something when a player joins a game.
});

ngs.onPlayerDisconnected(function(socket, player){
	// Do something when a player disconnects.
});

ngs.init(); // Initialize the Server.