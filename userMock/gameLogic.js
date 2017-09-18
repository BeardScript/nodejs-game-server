const GameLogic = 
{
	shouldStartGame: (game, socket) => {
		/* Here you write the conditions to start a game. Should return a boolean. */
	},

	onStartGame: (game, socket) => {
		/* Here you code what happens when the game starts */
	},

	shouldEndGame: (game, socket) => {
		/* Here you write the conditions to end a game. Should return a boolean. */
	},

	onEndGame: (game, socket) => {
		/* Here you code what happens when the game ends */
	},

	/* Here you define custom events to be called by the client */
	events: [
		myCustomEvent: {
			name: "eventName",
			body: (socket, data, game) =>{
				/* This block of code will be executed when the event is triggered */
			}
		}
	];
};

module.exports = GameLogic;