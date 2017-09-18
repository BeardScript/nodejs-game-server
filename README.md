# nodejs-game-server
A Node JS game server framekork, created on top of socket.io.

## introduction
This module is being developed with the intention of providing out-of-the-box functionality for game servers. Good part of it was already being developed locally so mostly this project is about putting already-created functionality together, as an API.

## /userMock
Inside this folder is the projection of how the Framework should be used. I use this to test the user experience as the API is being developed.

## /extensionsMock
This folder has mocks for extensions that will be in separate npm modules.

## Projected Use
The main file of your application will look something like this:

```
const options = {
	config: require('./config.json'),
	serverLogic: require('./serverLogic'),
	gameLogic: require('./gameLogic'),
	playerModel: require('./playerModel')
};

require('../index').start(options);
```

**config:** contains configuration settings for the server like the max amount of players, max amount of games, wether to use the built-in matchmaking or not, etc. There's not a clear sight of which elements are actually going to be needed yet but, the importance of this file is to provide a configuration interface that allows you to easily customize the server settings.

**serverLogic:** Here you write functionality for predefined **server** events and create your own

**gameLogic:** Here you write functionality for predefined **game** events and create your own.

**events:** is an array of event names (as strings) that will be called by the client. The functionality of an event must be defined in the gameLogic object **with the same key name**.

**playerModel:** the player prototype.

##Extensions
```
let ngsChat = new require('../extensionsMock/ngs-chat/ngs-chat')(options.serverLogic);
```
This represents the projected use of an extension. In this case the chat system will concatenate it's events to the serverLogic.events collection. The object's functions can be accessed from anywhere in the code to let users subscribe/unsubscribe players from chat channels. This is usefull to add chats for lobby, teams, and send private messages.

Other extensions would probably work in different ways, but it's important to keep them separate from the core app and easily accessible for you to set your own functionality. Respecting the modularity will help in keeping the framework agnostic and extendible.





