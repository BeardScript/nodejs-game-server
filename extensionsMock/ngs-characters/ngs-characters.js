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

Exports.defineCharacter = function(name, callback)
{
	let character = new Character();
	character.name = name;
	
	character = callback(character);
};

module.exports = Exports;