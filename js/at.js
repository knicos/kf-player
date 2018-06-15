const bs = require('binarysearch');

const player = require('./player.js');

player.prototype._nearestFrame = function(t) {
	let bsix = bs.closest(this._frames, t);
	return bsix;
}

player.prototype._nearestPrevFor = function(entity, startix) {
	let ix = startix;

	while (ix >= 0) {
		let frame = this._frames[ix];
		let data = this._frameData[frame];

		if (data.hasOwnProperty(entity)) return frame;
		ix--;
	}

	return null;
}

player.prototype._nearestNextFor = function(entity, startix) {
	let ix = startix;

	while (ix < this._frames.length) {
		let frame = this._frames[ix];
		let data = this._frameData[frame];

		if (data.hasOwnProperty(entity)) return frame;
		ix++;
	}

	return null;
}

function linear(a,b,t) {
	return (b-a)*t + a;
}

player.prototype._interpolate = function(entity, d1, d2, t) {
	let ef = this._entities[entity].interpolation;
	if (typeof ef == "function") {
		return ef(d1,d2,t);
	} else if (ef == "none") {
		return d1;
	} else if (ef == "linear") {
		// For each data item, do a linear interp
		let type = typeof d1;
		if (type == "object") {
			if (Array.isArray(d1)) {
				let r = [];
				for (var i=0; i<d1.length; i++) {
					let rt = typeof(d1[i]);
					if (rt == "number") {
						r.push(linear(d1[i],d2[i],t));
					} else {
						r.push(d1[i]);
					}
				}
				return r;
			} else {
				let r = {};
				// TODO
			}
		} else if (type == "number") {
			return linear(d1,d2,t);
		} else {
			return d1;
		}
	}
}

player.prototype.at = function(t) {
	if (t > this.duration() || t < 0) return null;

	let ms = Math.floor(t*1000);
	let frameix = this._nearestFrame(ms);
	let s = ms - this._frames[frameix];

	let r = {};
	// For each entity, find nearest frame
	for (var x in this._entities) {
		let fd = this._frameData[this._frames[frameix]];
		let n = (s <= 0 && fd.hasOwnProperty(x)) ? this._frames[frameix] : this._nearestNextFor(x, frameix+1);
		let p = (s >= 0 && fd.hasOwnProperty(x)) ? this._frames[frameix] : this._nearestPrevFor(x, frameix-1);

		// No previous data, no idea about this entity
		if (p == null) {
			r[x] = null;
			continue;
		}

		// No following data so remains unchanged.
		if (n == null) n = p;

		if (n == p) r[x] = this._frameData[n][x];
		else {
			// Must interpolate.
			let dt = n-p;
			let percent = (ms - p) / dt;
			let dn = this._frameData[n][x];
			let dp = this._frameData[p][x];

			r[x] = this._interpolate(x, dp, dn, percent);
		}
	}

	return r;
}

