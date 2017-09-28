# nodejs-game-server
# nodejs-game-server
A Node JS game server framekork, created on top of socket.io.

### WARNING!!
Be aware, this is still in a very early stage of development and not yet functional.

## introduction
This module is being developed with the intention of providing out-of-the-box functionality for game servers. Good part of it was already being developed locally so mostly this project is about putting already-created functionality together, as an API.

## Extensions
In order to provide modularity and flexibility, any "extra" functionality will be provided through **extension modules** that can also be easily created by the user. That is why this module contains only the core of the framework. Every new extension will have its own repo and will be maintained separately.

## Projected use so far
```javascript
const ngs = require('nodejs-game-server');
const NgsChat = require('ngs-chat');	// This is an extension. It ads a chat system to the server.
const ngsChat = new NgsChat(ngs);
const ngsCharacters = require('ngs-characters');	// This extension provides an interface to create Game Characters.

// Using the characters extension to define your characters
ngsCharacters.defineCharacter("uniqueCharacterName", function(character){
	character.someCharacterProperty = "propertyValue";
});

// Defining your game
ngs.defineGame(function(game){
	//Adding functionality to your game
	game.myAwesomeProperty = "propertyValue";

	game.myAwesomeMethod = function(socket){
		ngsChat.subscribe(socket, "someTeamChat");	// Using the chat extension.
	};

	game.createCharacter = function(id, uniqueName, ownerId){
		ngsCharacters.createCharacter(id, uniqueName, ownerId);
	};
});

// Creating Events that will be called by the client
ngs.createEvent("eventName", function(socket, data){
	let game = ngs.getGameByPlayer(socket.id);
	game.myAwesomeMethod(socket);	// Using your custom game functionality.
});

// Letting players create games
ngs.createEvent("createGame", function(socket, data){
	ngs.onCreateGame(function(game){
		// Do something when a game is created.
	});
});

// Letting players join created games
ngs.createEvent("joinGame", function(socket, data){
	const player = ngs.getPlayer(socket.id); // Retrieve the player
	//if player can join this game, then...
	ngs.onJoinGame(function(game){
		// Do something when a player joins a game.
	});
});

// Controlling how players create and join games with matchmaking
ngs.createEvent("rankedMatchMaking", function(socket, data){
	const player = ngs.getPlayer(socket.id); // Retrieve the player
	// Some matchmaking logic here

	// if there are no available games for this player
	ngs.onCreateGame(function(game){});
	// else
	ngs.onJoinGame(function(game){});
});

ngs.onLogin(function(socket, data){
	// Do something when a player attempts to sign in.
	// This callback will be triggered when calling the built in "login" event from the client.

	// You can either retrieve player's data from a database or leave it empty and let them login anonymously.
	// Injected player's data will be accessible in player.data
	let playerData = {};

	return playerData // Return an object with the player's data, or undefined if player doesn't exist.
});

ngs.onPlayerDisconnected(function(socket, player){
	// Do something when a player disconnects.
	// This is very usefull to apply your rules, when a player disconnects in the middle of a game.
});

ngs.init(); // Initialize the Server.
```
