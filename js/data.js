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
		this._frames = this._frames.sort();
	}

	for (var x in data) this._addEntity(x, (opt.entities) ? opt.entities[x] : undefined);
}

player.prototype.data = function(data) {
	let offset = 0;
	if (data.start) offset = data.start;

	for (var x in data) {
		if (!isNaN(x)) {
			this.insert(x-offset, data[x], data);
		}
	}
};
