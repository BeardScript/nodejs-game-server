# nodejs-game-server
A Node JS game server framekork, created on top of socket.io.

##WARNING!!
This is still in a very early stage of development and subject to changes.

## introduction
This module is being developed with the intention of providing out-of-the-box functionality for game servers. Good part of it was already being developed locally so mostly this project is about putting already-created functionality together, as an API.

## /userMock
Inside this folder is the projection of how the Framework should be used. I use this to test the user experience as the API is being developed.

## /extensionsMock
This folder has mocks for extensions that will be in separate npm modules.

## Use
```
let ngs = require('nodejs-game-server'); //Save a reference to the module
let ngsChat = new require('ngs-chat')(ngs.lobby); //Save a reference to an extension

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
```
