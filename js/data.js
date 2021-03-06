const player = require('./player.js');

player.prototype._addEntity = function(name, data) {
	if (!this._entities[name]) {
		if (data) this._entities[name] = data;
		else this._entities[name] = {};
	}

	let e = this._entities[name];
	
	if (!e.interpolation) e.interpolation = "linear";
}

player.prototype.insert = function(frame, data, opt) {
	if (this._frameData[frame]) {
		// TODO Merge to existing frame
	} else {
		this._frameData[frame] = data;
		this._frames.push(frame);
	}

	for (var x in data) this._addEntity(x, (opt.entities) ? opt.entities[x] : undefined);
}

function exclude(x, a) {
	let b = {};
	for (var xx in a) {
		if (xx == x) continue;
		b[xx] = a[xx];
	}
	return b;
}

player.prototype.data = function(data) {
	let offset = 0;
	if (data.start) offset = data.start;

	let dat = (data.data) ? data.data : data;

	if (Array.isArray(dat)) {
		let timestamp = data.timestamp;
		if (!timestamp && dat.length > 0) {
			let d0 = dat[0];
			if (Array.isArray(d0)) timestamp = 0;
			else {
				for (var x in d0) {
					if (typeof x != "string") continue;
					let xlc = x.toLowerCase();
					if (!isNaN(d0[x]) && xlc.includes("time") || xlc.includes("stamp")) {
						timestamp = x;
						break;
					}
				}

				if (!timestamp) {
					for (var x in d0) {
						timestamp = x;
						break;
					}
				}
			}
		}

		for (var i=0; i<dat.length; i++) {
			let t = dat[i][timestamp];
			this.insert(t-offset, exclude(timestamp, dat[i]), data);
		}
	} else {
		for (var x in dat) {
			if (!isNaN(x)) {
				this.insert(x-offset, dat[x], data);
			}
		}
	}

	this._frames = this._frames.sort();
};
