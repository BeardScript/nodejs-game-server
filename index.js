function startGameServer(options)
{
	const server = require('express').express();
	let io = require('socket.io')(server);
	let port = process.env.PORT || 3000;

	const gs = createGameServer(options);

	server.listen(port, function()
	{
		console.log ('Server listening on port ' + port);
	});

	io.sockets.on('connection', function(socket)
	{
	    gs.onConnection(socket);

		for(let event in options.gameLogic.events)
		{
		    socket.on(event, function(data){
		    	options.gameLogic.events[event](socket, data, gs.getGame(socket.id));
		    });
		}
	});
};

function createGameServer(options) 
{
	const GameServer = require('./game-server');
	return new GameServer(options);
};

module.exports.start = startGameServer;