const lobby = require('./lobby');
const Game = require('./game');
const Player = require('./Player');
const clone = require('cloneextend').clone;

function NodeJSGameServer() {
    let events = [
    {
            name: "disconnect", 
            body: function(socket){
                onPlayerDisconnected(socket);
            }
        },
        {
            name: "login",
            body: function(socket, data){
                onLogin(socket, data);
            }
        }
    ];

    this.createEvent = function (name, callback)
    {
        events.push({
            name: name,
            body: function(socket, data) {
                callback(socket, data);
            }
        });
    };

    this.defineGame = function (name, callback)
    {
        let CustomGame = callback();
        Object.assign(CustomGame.prototype, Game.prototype);

        let game = new CustomGame();
        Object.assign(game, new Game());

        if(game.maxPlayers == undefined)
            game.maxPlayers = 2;

        lobby.gameTypes[name] = game;
    };

    this.getGameByPlayer = function(playerId)
    {
        const player = lobby.players[playerId];

        return lobby.games[player.activeGameId];
    };

    this.getGame = function(gameId){
        return lobby.games[gameId];
    };

    this.getGames = function(){
        return lobby.games;
    };

    this.getUserGame = function(gameId)
    {
        return lobby.userGames[gameId];
    };

    this.getUserGames = function()
    {
        return lobby.userGames;
    };

    this.getGamesCount = function(){
        return lobby.gamesCount;
    };

    this.getPlayer = function(socket){
        return lobby.players[socket.posId];
    };

    this.getPlayers = function(){
        return lobby.players;
    };

    this.getPlayersCount = function(){ 
        return lobby.playersCount
    };

    this.setMaxPlayers = function(amount){
        lobby.maxPlayers = amount;
    };

    this.setMaxGames = function(amount){
        lobby.maxGames = amount;
    };

    this.setMaxRunningGames = function(amount){
        lobby.maxRunningGames = amount;
    };

    this.init = function(beforeCallback, afterCallback) 
    {
        if (beforeCallback && typeof(beforeCallback) === "function")
            beforeCallback();

        const app = require('express')();
        const server = require('http').Server(app);
        const io = require('socket.io')(server);
        const port = process.env.PORT || 3000;

        server.listen(port, function()
        {
            console.log ('Server listening on port ' + port);
        });

        io.sockets.on('connection', function(socket)
        {
            onConnection(socket);
            loadEvents(socket);
        });

        if (afterCallback && typeof(afterCallback) === "function")
            afterCallback();
    };

    function onConnection(socket)
    {
        console.log('user connected: '+ socket.id);
        socket.emit("connected");
    }

    function loadEvents(socket)
    {
        for(let i = 0; i < events.length; i++)
        {
            socket.on(events[i].name, function(data){
                events[i].body(socket, data);
            });
        }
    }

    let onLoginCallback;

    this.onLogin = function (callback)
    {
        onLoginCallback = callback;
    };

    function onLogin(socket, data)
    {
        let playerData = undefined;

        if (onLoginCallback && typeof(onLoginCallback) === "function")
        playerData = onLoginCallback(socket, data);

        if(playerData === undefined)
            return;

        const player = new Player(socket.id, playerData);
        lobby.addPlayer(socket, player);

        socket.emit('loggedIn', player);
    }

    this.createGame = function(options, callback)
    {
        let game = lobby.newGame(options);
        let player = lobby.players[options.socket.posId];

        game.addPlayer(options.socket);
        player.activeGameId = game.id;

        callback(game);
    };

    this.joinGame = function(socket, game, callback)
    {
        if(game == undefined)
            return;

        let player = this.getPlayer(socket);
        game.addPlayer(socket);
        player.activeGameId = game.id;

        callback();
    };

    this.removeGame = function(socket, gameId, callback)
    {
        const player = this.getPlayer(socket);

        if(player.activeGameId != gameId)
            return;

        const game = lobby.deleteGame(gameId);
        player.activeGameId = null;
        
        callback(game);
    };

    let onPlayerDisconnectedCallback;

    this.onPlayerDisconnected = function(callback)
    {
        onPlayerDisconnectedCallback = callback;
    };

    function onPlayerDisconnected(socket)
    {
        let player = lobby.removePlayer(socket);

        if (onPlayerDisconnectedCallback && typeof(onPlayerDisconnectedCallback) === "function")
            onPlayerDisconnectedCallback(socket, player);
    }

    return this;
}

module.exports = NodeJSGameServer();