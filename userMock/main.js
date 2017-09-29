const ngs = require('../nodejs-game-server');
const NgsChat = require('../extensionsMock/ngs-chat/ngs-chat');
const ngsChat = new NgsChat(ngs);
const ngsCharacters = require('../extensionsMock/ngs-characters/ngs-characters');

ngsCharacters.defineCharacter("uniqueCharacterName", function(character){
	character.someCharacterProperty = "propertyValue";
});

ngs.defineGame("myGame", function(game){
	game.test = "test";
});

ngs.createEvent("createGame", function(socket, data){
	const gameType = data;
	ngs.createGame(socket, gameType, function(game){
		socket.emit('gameCreated', game);
	});
});

ngs.createEvent("removeGame", function(socket, data){
	const gameId = data;
	ngs.removeGame(socket, gameId, function(gameId){
		socket.emit('gameRemoved', gameId);
	});
});

ngs.createEvent("joinGame", function(socket, data){
	ngs.joinGame(function(game){
		socket.emit('joinedGame', game);
	});
});

ngs.onLogin(function(socket, data){
	return {};
});

ngs.onPlayerDisconnected(function(socket, player){
	console.log('player disconnected');
});

ngs.init();

module.exports.ngs = ngs;