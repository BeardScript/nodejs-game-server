# nodejs-game-server
A Node JS game server framekork, created on top of socket.io.

## introduction
This module is being developed with the intention of providing out-of-the-box functionality for game servers. Good part of it was already being developed locally so mostly this project is about putting already-created functionality together, as an API.

## /userMock
Inside this folder is the projection of how the Framework should be used. I use this to test the user experience as the API is being developed.

## Projected Usage
The main file of your application will look something like this:

```
const events = require('./events');
const config = require('./config.json');
const gameLogic = require('./gameLogic');
const playerModel = require('./playerModel');
const characterModel = require('./characterModel');
const definedCharacters = require('./myCharacters');

const options = {
	config: config,
	events: events,
	gameLogic: gameLogic,
	playerModel: playerModel,
	characterModel: characterModel,
	definedCharacters: definedCharacters
};

require('nodejs-game-server').start(options);
```

**config:** contains configuration settings for the server like the max amount of players, max amount of games, wether to use the built-in matchmaking or not, etc. There's not a clear sight of which elements are actually going to be needed yet but, the importance of this file is to provide a configuration interface that allows you to easily customize the server settings.

**gameLogic:** here's where you develop your game's logic.

**events:** is an array of event names (as strings) that will be called by the client. The functionality of an event must be defined in the gameLogic object **with the same key name**.

**playerModel:** the player prototype.

**characterModel:** the character prototype.

**difinedCharacters:** an object with your prototyped "types" of characters, as properties.




