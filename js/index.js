const Player = require('./player.js');

function wrapper(options) {
	let kfp = new Player(options);
	return kfp;
}

module.exports = wrapper;

