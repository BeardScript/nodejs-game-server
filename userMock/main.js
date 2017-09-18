const options = {
	config: require('./config.json'),
	serverLogic: require('./serverLogic'),
	gameLogic: require('./gameLogic'),
	playerModel: require('./playerModel')
};

//This is how an extension would be use
let ngsChat = new require('../extensionsMock/ngs-chat/ngs-chat')(options.serverLogic);

require('../index').start(options);