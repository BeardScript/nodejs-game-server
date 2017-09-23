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
```
let ngs = require('nodejs-game-server');
let ngsChat = new require('ngs-chat')(ngs);

ngs.defineGame(function(game){
	game.myAwesomeMethod = function(socket){
		ngsChat.subscribe(socket, "someTeamChat");
	};
	game.myAwesomeProperty = "propertyValue";
});

ngs.createEvent("eventName", function(socket, data){
	let game = ngs.getGame(socket.id);
	game.myAwesomeMethod(socket);
});

ngs.init();
```
