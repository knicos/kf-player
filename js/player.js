const INTERP_LINEAR = "linear";
const INTERP_NONE = "none";

// -----------------------------------------------------------------------------

/* Keyframe Player data structure */
function KFPlayer() {
	this._frames = [];
	this._frameData = {};
	this._interp = INTERP_LINEAR;
	this._threeD = false;
	this._entities = {};
	this._start = Date.now();
	this._speed = 1;
}

/** Duration of entire animation in seconds */
KFPlayer.prototype.duration = function() {
	if (this._frames.length == 0) return 0;
	return this._frames[this._frames.length-1] / 1000;
}

KFPlayer.prototype.entities = function() {
	return Object.keys(this._entities);
}

KFPlayer.prototype.frameCount = function() {
	return this._frames.length;
}

KFPlayer.prototype.begin = function() {
	this._start = Date.now();
}

KFPlayer.prototype.end = function() {

}

KFPlayer.prototype.speed = function(s) {
	this._speed = s;
	// TODO Speed should only influence following playback
}

KFPlayer.prototype.frame = function() {
	let t = Date.now();
	let dt = t - this._start;
	return this.at(dt*this._speed);
}

// -----------------------------------------------------------------------------

module.exports = KFPlayer;
