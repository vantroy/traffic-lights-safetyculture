"use strict";

var constants = require("./lib/constants");
var LinkedLightsManager = require("./lib/linked-lights-manager");

var cross = new LinkedLightsManager();


cross.addTrafficLight("North", constants.GREEN, checkError);
cross.addTrafficLight("South", constants.GREEN, checkError);
cross.addTrafficLight("West", 'YOLO', checkError);
cross.addTrafficLight("East", constants.RED, checkError);
cross.addTrafficLight("North Right", constants.GREEN, checkError);

function checkError(err) {
    if(err) {
        // Do something
        // For this exercise error is already being logged.
    }
}

console.log("------------------------------------");

cross.tick(() => {});

console.log("------------------------------------");

cross.tick(() => {});

console.log("------------------------------------");

cross.tick(() => {});

console.log("------------------------------------");

cross.tick(() => {});

console.log("------------------------------------");

cross.tick(() => {});

console.log("------------------------------------");

cross.tick(() => {});
