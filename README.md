# kf-player
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
	timestamp: "TIME",
	data: [
		{TIME: 100, x1: 200, y1: 200, x2: 300, y2: 200},
		{TIME: 200, x1: 240, y1: 320, x2: 300, y2: 210}
	]
});
```
