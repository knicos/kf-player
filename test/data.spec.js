const assert = require('chai').assert;
const Player = require('../js/player.js');
require('../js/data.js');

describe(".data(Object)", function() {
	describe("Single entity, standard data", function() {
		it("processes 2 frames", function() {
			let player = new Player();
			player.data({
				100: {object1: [200,300]},
				200: {object1: [250,320]}
			});

			assert.equal(player.frameCount(), 2);
			assert.equal(player.duration(), 0.2);
			assert.deepEqual(player.entities(), ["object1"]);
		});
	});

	describe("option.start", function() {
		it("shifts timestamps by the start offset", function() {
			let player = new Player();
			player.data({
				start: 100,
				100: {object1: [200,300]},
				200: {object1: [250,320]}
			});

			assert.equal(player.frameCount(), 2);
			assert.equal(player.duration(), 0.1);
		});
	});

	describe("option.entities", function() {
		
	});

	describe("option.units", function() {

	});

	describe("CSV style data import", function() {
		it("accepts array of objects with timestamp property", function() {
			let player = new Player();
			player.data({
				timestamp: "TIME",
				data: [
					{TIME: 100, x1: 200, y1: 200, x2: 300, y2: 200},
					{TIME: 200, x1: 240, y1: 320, x2: 300, y2: 210}
				]
			});

			assert.equal(player.frameCount(), 2);
			assert.equal(player.duration(), 0.2);
			assert.sameMembers(player.entities(), ["x1","y1","x2","y2"]);
		});
	});
});

