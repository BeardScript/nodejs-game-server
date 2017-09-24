function Character()
{
	this.id = "";
	this.owner = "";
	this.data = {};
};

let Exports = {};

Exports.characters = {};

Exports.createCharacter = function(id, name, owner)
{
	let character = Object.create(characters[name]);

	character.id = id;
	character.owner = owner;
};

Expots.defineCharacter = function(name, callback)
{
	let character = new Character();
	character = callback(character);

	characters.name = character;
};

module.exports = Exports;