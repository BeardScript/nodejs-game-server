const ServerLogic = 
{
	onConnection: (gs, socket) => {
		/* Executes when a player estabilishes connection */
	},

	shouldCreatePlayer: (gs, socket) => {
		/* Custom conditions to allow a player to be created */
	},

	onCreatePlayer: (gs, player, socket) => {
		/* Executes when a player is created */
	};

	onAddPlayer: (gs, player, socket) => {
		/* Executes when a player is added to the server */
	},

	shouldRemovePlayer: (gs, player, socket) => {
		/* Custom conditions to allow a player to be removed */
	},

	onRemovePlayer: (gs, player, socket) => {
		/* Executes when a player is removed */
	},

	shouldCreateGame: (gs, socket) => {
		/* Custom conditions to allow a game to be created */
	},

	onCreateGame: (gs, game, socket) => {
		/* Executes when a game is created */
	},

	shouldJoinGame: (gs, game, player) => {
		/* Custom conditions to allow a player to join a game */
	},

	onJoinGame: (gs, game, socket) => {
		/* Executes when a player joins a game */
	},

	onRemoveGame: (gs, game, socket) => {
		/* Here you code what happens when the game ends */
	},

	/* Here you define custom events to be called by the client */
	events: [
		myCustomEvent: {
			name: "eventName",
			body: (socket, data, gs) =>{
				/* This block of code will be executed when the event is triggered */
			}
		}
	];
};

module.exports = ServerLogic;