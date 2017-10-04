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

Game.prototype.isOwner = function(socket)
{
    return this.owner === socket.posId;
};

module.exports = Game;