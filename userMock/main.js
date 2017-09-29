const ngs = require('../nodejs-game-server');
const NgsChat = require('../extensionsMock/ngs-chat/ngs-chat');
const ngsChat = new NgsChat(ngs);
const ngsCharacters = require('../extensionsMock/ngs-characters/ngs-characters');

ngsCharacters.defineCharacter("uniqueCharacterName", function(character){
	character.someCharacterProperty = "propertyValue";
});

ngs.defineGame("myGame", function(){
	function MyGame(){
		this.test = "test";
	}

	MyGame.prototype.testMethod = function(){};

	return MyGame
});

ngs.defineGame("myOtherGame", function(){
	function MyGame(){
		this.test = "test1";
	}

	MyGame.prototype.testMethod1 = function(){};

	return MyGame
});

ngs.createEvent("createGame", function(socket, data){
	const gameType = data;
	ngs.createGame(socket, gameType, function(game){
		socket.emit('gameCreated', game);
		socket.broadcast.to('lobby').emit('gameCreated', game);
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
		let player = ngs.getPlayer(socket);
		socket.broadcast.to(game.id).emit('joinedGame', player);
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