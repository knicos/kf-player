# kf-player [![Build Status](https://travis-ci.org/knicos/kf-player.svg?branch=master)](https://travis-ci.org/knicos/kf-player) [![Coverage Status](https://coveralls.io/repos/github/knicos/kf-player/badge.svg?branch=master)](https://coveralls.io/github/knicos/kf-player?branch=master) [![npm version](https://badge.fury.io/js/kf-player.svg)](https://badge.fury.io/js/kf-player)
Keyframe style data replay, used for dynamic eye tracking but can keyframe any
data set.

## Installation

```
npm install kf-player
```

## Usage

```javascript
const player = require('kf-player')();

player.data({
	1000: {entity1: [100,200], entity2: true},
	2000: {entity1: [200,300], entity2: false}	
});

let state = player.at(1.2);

console.log(state.entity1);    // [120,220]
console.log(state.entity2);    // true
```

Multiple data sets can be given by multiple calls to `.data()`. Any number of
entities can be used, and don't need to be specified for each key frame. Each
entity can be of primitive, object or array data types.

By default linear interpolation is performed on numeric values, this can be
changed to "none" or a custom function (more to be added...):

```javascript
player.data({
	entities: {
		entity1: {
			interpolation: function(previous,next,percent) { ... }
		}
	},
	1000: {entity1: [100,200], entity2: true},
	2000: {entity1: [200,300], entity2: false}	
});
```

Alternative data formats can also be used, for example a format compatible with
loading csv or similar data (see csvtojson):

```javascript
player.data({
	timestamp: "TIME",    // Property name
	data: [
		{TIME: 100, x1: 200, y1: 200, x2: 300, y2: 200},
		{TIME: 200, x1: 240, y1: 320, x2: 300, y2: 210}
	]
});
```

## API

### .at(t)
Get the state of all entities at the time `t`, where `t` is in seconds. It
returns an object with a property for each entity and where the values for
each entity have been appropriately (as specified) interpolated.

### .duration()
Return total animation duration in seconds.

```
console.log(player.duration());    // 5.4
```

### .entities()
Return a list of all entities in the animation.

### .frameCount()
Return the number of keyframes.

### .begin([time])
Start a new animation sequence. Optional: give a time in seconds to start at.

### .end()
Finish an animation.

### .frame()
Get the state of the animation at the current frame. The frame to return is
calculated from the system clock and animation speed. To get a specific point
in the animation, use the `.at(t)` function.

### .speed(s)
Set the speed as a multiplier. eg. 2 runs the animation at 2x natural speed.
Using no arguments, this function returns the current speed.

