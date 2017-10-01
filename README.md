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
const NgsChat = require('ngs-chat');    // This is an extension. It ads a chat system to the server.
const ngsChat = new NgsChat(ngs);
const ngsCharacters = require('ngs-characters');    // This extension provides an interface to create Game Characters.

// Using the characters extension to define your characters
ngsCharacters.defineCharacter("uniqueCharacterName", function(character){
    character.someCharacterProperty = "propertyValue";
});

// Set the maximum amount of players allowed into the server.
ngs.setMaxPlayers(400);

// Set the maximum amount of games allowed to be created.
ngs.setMaxGames(400);

// Set the maximum amount of games allowed to be running at the same time.
ngs.setMaxRunningGames(200);

// Defining your game
ngs.defineGame(function(game){
    // Define your custom game Object. This object will inherit from the 'Game' object so you can access it's properties, although, overriding them could cause the system to break.
    function MyGame(){
        // this.property will be seen by the client
        this.test = "test";
        // Set the maximum amount of players allowed into this game. If ommited delault will be set to 2
        this.maxPlayers = 2;
    }
    //this method won't be seen by the client
    MyGame.prototype.testMethod = function(){};
    // return the defined Object.
    return MyGame
});

// Creating Events that will be called by the client
ngs.createEvent("eventName", function(socket, data){
    let game = ngs.getGameByPlayer(socket.id);
    game.myAwesomeMethod(socket);   // Using your custom game functionality.
});

// Letting players create games
ngs.createEvent("createGame", function(socket, data){
    // Create the options object to pass on to our method
    const options = {
        socket: socket,
        game: data.game,
        origin: "user", // or matchmaking if it were the case
        password: data.pass // Omit for no password
    };
    ngs.createGame(options, function(game){
        // Do something when a game is created.
        // Tell the client that the game was created
        socket.emit('gameCreated', game);
        // Tell all players in the room, 'lobby' that this game was created
        socket.broadcast.to('lobby').emit('gameAdded', {id:game.id, players:game.players});
    });
});

// Letting players join created games
ngs.createEvent("joinGame", function(socket, data){
    // Retrieve the Game
    const game = ngs.getUserGame(data.id);
    // Make sure the game exists
    if(game == undefined)
        return;
    // Make sure the password matches
    if(data.pass !== game.password)
        return;

    // We let the player join
    ngs.joinGame(socket, gameId, function(game){
        // Do something when a player joins a game.
        // Tell the client it successfully joined the game
        socket.emit('joinedGame', game);
        // Retrieve the player
        const player = ngs.getPlayer(socket);
        // Tell all clients in the game room that this player joined
        socket.broadcast.to(game.id).emit('joinedGame', player);
    });
});

// Letting players remove created games
ngs.createEvent("removeGame", function(socket, data){
    const gameId = data;
    ngs.removeGame(socket, gameId, function(gameId){
        // Do something when a game is removed
        // Tell the client the game was removed
        socket.emit('gameRemoved', gameId);
        // Tell all clients in the 'lobby' room which game was removed
        socket.broadcast.to('lobby').emit('gameRemoved', gameId);
        // Tell all players inside the game that it was removed
        socket.broadcast.to(gameId).emit('activeGameRemoved');
    });
});

// Controlling how players create and join games with matchmaking
ngs.createEvent("rankedMatchMaking", function(socket, data){
    const player = ngs.getPlayer(socket.id); // Retrieve the player
    // Some matchmaking logic here

    // if there are no available games for this player
    ngs.createGame(function(game){});
    // else
    ngs.joinGame(function(game){});
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
