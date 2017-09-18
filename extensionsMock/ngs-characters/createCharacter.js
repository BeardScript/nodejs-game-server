const Character = require('./character');

const createCharacter = function(id, owner, unitData)
{
	const definedCharacters = require('./definedCharacters');

	return new Character(id, owner, definedCharacters[unitData.name]);
};

module.exports = createCharacter;