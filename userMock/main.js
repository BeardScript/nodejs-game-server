const ngs = require('../nodejs-game-server');
const ngsChat = require('../extensionsMock/ngs-chat/ngs-chat');
const ngsCharacters = require('../extensionsMock/ngs-characters/ngs-characters');

ngsCharacters.defineCharacter("uniqueCharacterName", function(character){
    character.someCharacterProperty = "propertyValue";
});

// Set the maximum amount of players allowed into the server.
ngs.setMaxPlayers(400);

// Set the maximum amount of games allowed to be created.
ngs.setMaxGames(400);

// Set the maximum amount of games allowed to be running at the same time.
ngs.setMaxRunningGames(200);

ngs.defineGame("myGame", function(){
    function MyGame(){
        this.test = "test";
        this.maxPlayers = 2;
    }

    MyGame.prototype.testMethod = function(){};

    MyGame.prototype.spawnCharacters = function(){};

    MyGame.prototype.startGame = function(socket){
        this.spawnCharacters();
        // Do other stuff when a game starts.
        socket.emit('gameStarted', this);
        socket.broadcast.to(this.room).emit('gameStarted', this);
    };

    MyGame.prototype.onStartGame = function(socket){
        // Some logic to start a game here

        let gameStatus = ngs.startGame(this);

        if(gameStatus === "started")
            this.startGame(socket);
        else if(gameStatus === "gameRoomsFull")
            socket.emit('gameRoomsFull');
        else if(gameStatus === "gameAlreadyRunning")
            socket.emit('gameAlreadyRunning');
    };

    return MyGame;
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
        socket.join(game.room);
        socket.broadcast.to('lobby').emit('gameAdded', {id:game.id, players:game.players});
    });
});

ngs.createEvent("startGame", function(socket, gameId){
    let game = ngs.getUserGame(gameId);

    if(game.isOwner(socket))
        game.onStartGame(socket);
    else
        socket.emit('forbiddenAction');
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
    
    if(!player.activeGameId)
        return;

    const game = lobby.userGames[player.activeGameId];

    if(!game)
        game = lobby.games[player.activeGameId];

    game.removePlayer(socket);
});

ngs.init(function beforeInit(){
    // This is called right before the server starts.

    ngsChat.init(ngs); // Initialize the plugin

    // All plugins that contain events should be loaded before the server is initialized.
    // You can either make sure that ngs.init() is called after all events are defined 
    // or you can define them here directly. It could be considered a good practice to
    // define everything in here, either directly or through require(), to make sure
    // there are no issues regarding the order of execution.
},
function afterInit(){
    // This is called after the server has started and all events have been loaded.
    // You can simply omit it if it's not useful to you.
});

module.exports.ngs = ngs;