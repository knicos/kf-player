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

// -----------------------------------------------------------------------------

module.exports = KFPlayer;
