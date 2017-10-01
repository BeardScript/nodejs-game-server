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
        // this.maxPlayers = 2;
    }

    MyGame.prototype.testMethod = function(){};

    return MyGame
});

ngs.createEvent("createGame", function(socket, data){
    const options = {
        socket: socket,
        game: data.game,
        origin: "user",
        password: data.pass // Omit for no password
    };
    ngs.createGame(options, function(game){
        socket.emit('gameCreated', game);
        socket.broadcast.to('lobby').emit('gameAdded', {id:game.id, players:game.players});
    });
});

ngs.createEvent("removeGame", function(socket, data){
    const gameId = data;
    ngs.removeGame(socket, gameId, function(gameId){
        socket.emit('gameRemoved', gameId);
    });
});

ngs.createEvent("joinGame", function(socket, data){
    const game = ngs.getUserGame(data.id);

    if(game == undefined)
        return;

    if(data.pass !== game.password)
        return;

    ngs.joinGame(socket, game, function(){
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