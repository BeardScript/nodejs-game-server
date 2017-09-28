const ngs = require('../nodejs-game-server');
const NgsChat = require('../extensionsMock/ngs-chat/ngs-chat');
const ngsChat = new NgsChat(ngs);
const ngsCharacters = require('../extensionsMock/ngs-characters/ngs-characters');

ngsCharacters.defineCharacter("uniqueCharacterName", function(character){
	character.someCharacterProperty = "propertyValue";
});

ngs.defineGame(function(game){
	game.myCustomFunction = function(){
		return true;
	};
});

ngs.createEvent("createGame", function(socket, data){
	ngs.createGame(socket, data, function(game){
		
	});
});

ngs.createEvent("joinGame", function(socket, data){
	const player = ngs.getPlayer(socket.id);

	ngs.joinGame(function(game){

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