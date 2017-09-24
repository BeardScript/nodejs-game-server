# nodejs-game-server
A Node JS game server framekork, created on top of socket.io.

##WARNING!!
Be aware, this is still in a very early stage of development and not yet functional.

## introduction
This module is being developed with the intention of providing out-of-the-box functionality for game servers. Good part of it was already being developed locally so mostly this project is about putting already-created functionality together, as an API.

## /userMock
Inside this folder is a simulation of how the Framework should be used. I use this to test the user experience as the API is being developed.

## /extensionsMock
This folder has mocks for extensions that will be in separate npm modules.

## Projected use so far
```javascript
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
```
