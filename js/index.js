const transform = require('./transform.js');
const Player = require('./player.js');

function wrapper(options) {
	let data = transform(options);

	let kfp = new Player(data);
	return kfp;
}

module.exports = wrapper;
