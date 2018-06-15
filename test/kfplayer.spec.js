const player = require('../');
const assert = require('chai').assert;

let data1 = {
	0: {e1: [10,10], e2: 20, e3: [14, true, "message1"]},
	2000: {e1: [30,30], e2: 22, e3: [16, false, "message2"]},
	4000: {e1: [40,40], e2: 23}
};

describe(".duration()", function() {
	it("returns correct duration when no start shift", function() {
		let p = player();
		p.data(data1);
		assert.equal(p.duration(), 4.0);
	});

	it("returns zero duration when no data", function() {
		let p = player();
		assert.equal(p.duration(), 0);
	});
});

describe(".entities()", function() {
	it("returns correct entity list", function() {
		let p = player();
		p.data(data1);
		assert.sameMembers(p.entities(), ["e1","e2","e3"]);
	});
});

describe(".frame()", function() {
	it("returns an interpolated frame", function(done) {
		let p = player();
		p.data(data1);
		p.begin();
		setTimeout(function() {
			let state = p.frame();
			assert.exists(state);
			assert.approximately(state.e1[0], 20, 2);
			p.end();
			done();
		}, 1000);
	});
});
