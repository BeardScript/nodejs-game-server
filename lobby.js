const Game = require('./game');
const clone = require('cloneextend').clone;

function Lobby()
{
    this.maxPlayers = 400;

    this.playersCount = 0;

    this.players = [];
    this.playersEmptyPositions = [];

    this.maxGames = 400;
    this.maxRunningGames = 200;

    this.gamesCount = 0;
    this.runningGamesCount = 0;

    this.matchmakingGamesCount = 0;
    this.games = [];
    this.gamesEmptyPositions = [];
    this.availableGame = {};

    this.userGamesCount = 0;
    this.userGames = [];
    this.userGamesEmptyPositions = [];

    this.gameTypes = {};

    this.addPlayer = function(socket, player)
    {
        if(this.playersEmptyPositions.length > 0)
            socket.posId = this.playersEmptyPositions.pop();
        else if(this.playersCount < this.maxPlayers)
            socket.posId = this.playersCount;
        else
            return;
        
        this.playersCount++;
        this.players[socket.posId] = player;
    };

    this.removePlayer = function(socket) 
    {
        const player = this.players[socket.posId];
        
        this.players[socket.posId] = undefined;
        this.playersEmptyPositions.push(socket.posId);
        this.playersCount--;

        return player;
    };

    this.newGame = function(options)
    {
        let game = Object.create(this.gameTypes[options.game]);
        game = Object.assign(this.gameTypes[options.game]);

        if(options.password)
            game.password = options.password;

        if(options.origin === "matchmaking")
        {
            if(this.gamesEmptyPositions.length > 0)
                game.id = this.gamesEmptyPositions.pop();
            else if(this.gamesCount < this.maxGames)
                game.id = this.matchmakingGamesCount;
            else
                return undefined;

            this.games[game.id] = game;
            this.matchmakingGamesCount++;
        }
        else if(options.origin === "user")
        {
            if(this.userGamesEmptyPositions.length > 0)
                game.id = this.userGamesEmptyPositions.pop();
            else if(this.gamesCount < this.maxGames)
                game.id = this.userGamesCount;
            else
                return undefined;

            this.userGames[game.id] = game
            this.userGamesCount++;
        }

        this.gamesCount++;

        return game;
    };

    this.deleteGame = function(gameId)
    {
        let game = this.games[gameId];

        if(game == undefined)
            return undefined;

        this.games[gameId] = undefined;
        this.gamesEmptyPositions.push(gameId);
        this.gamesCount--;

        return game;
    };
}

module.exports = new Lobby();