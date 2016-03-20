"use strict";

var TrafficLight = require("./lib/traffic-light");
var constants = require("./lib/constants")
var CrossRoad = require("./lib/crossroad");

var cross = new CrossRoad();

var lightN = new TrafficLight("North", constants.GREEN, cross);
var lightS = new TrafficLight("South", constants.GREEN, cross);
var lightW = new TrafficLight("West", constants.RED, cross);
var lightE = new TrafficLight("East", constants.RED, cross);

// for (var i = 0; i < 4; i++) {
//     light.cycle();
// }

// lightN.state();

cross.emit("change-yellow");

console.log("------------------------------------");

cross.emit("change-lights");

console.log("------------------------------------");

cross.emit("change-yellow");

console.log("------------------------------------");

cross.emit("change-lights");

console.log("------------------------------------");

cross.emit("change-yellow");

console.log("------------------------------------");

cross.emit("change-lights");

console.log("------------------------------------");

cross.emit("change-yellow");
