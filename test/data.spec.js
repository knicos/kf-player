const assert = require('chai').assert;
const Player = require('../js/player.js');
require('../js/data.js');

describe(".data(Object)", function() {
	describe("Single entity", function() {
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
});

