const assert = require('chai').assert;
const Player = require('../js/player.js');
require('../js/at.js');

let data1 = {
	0: {e1: [10,10], e2: 20, e3: [14, true, "message1"]},
	2000: {e1: [30,30], e2: 22, e3: [16, false, "message2"]},
	4000: {e1: [40,40], e2: 23}
};

describe(".at(Time)", function() {
	it("matches frame exactly", function() {
		let player = new Player();
		player.data(data1);

		let entities = player.at(2.0);
		assert.deepEqual(entities, data1[2000]);
	});

	it("fills missing entity data on exact frame match", function() {
		let player = new Player();
		player.data(data1);

		let entities = player.at(4.0);
		assert.deepEqual(entities.e3, [16, false, "message2"]);
	});

	describe("linear interpolation", function() {
		it("interpolates array of numbers", function() {
			let player = new Player();
			player.data(data1);

			let entities = player.at(1.0);
			assert.deepEqual(entities.e1, [20,20]);
		});

		it("interpolates single number", function() {
			let player = new Player();
			player.data(data1);

			let entities = player.at(1.0);
			assert.equal(entities.e2, 21);
		});

		it("skips non-numeric array items", function() {
			let player = new Player();
			player.data(data1);

			let entities = player.at(1.0);
			assert.deepEqual(entities.e3, [15 , true, "message1"]);
		});
	});
});
