function Game(){
    this.id = undefined;
    this.room = undefined;
    this.players = [];
    this.playersCount = 0;
    this.playersEmptyPositions = [];
    this.isRunning = false;
}

Game.prototype.addPlayer = function(socket)
{
    if(this.playersEmptyPositions.length > 0)
        socket.gamePos = this.players.pop();
    else if(this.playersCount < this.maxPlayers)
        socket.gamePos = this.playersCount;
    else
        return undefined;

    this.playersCount++;
    this.players[socket.gamePos] = socket.posId;
};

Game.prototype.removePlayer = function(socket)
{   
    if(this.isOwner(this.players[socket.gamePos]))
        changeOwner(this);

    this.players[socket.gamePos] = undefined;
    this.playersEmptyPositions.push(socket.gamePos);
    this.playersCount--;
};

Game.prototype.isOwner = function(socket)
{
    return this.owner === socket.posId;
};

module.exports = Game;

function changeOwner(game)
{
    for(let i = 0; i < game.players.length; i++)
    {
        if(game.players[i] != undefined)
            game.owner = game.players[i];
    }
}