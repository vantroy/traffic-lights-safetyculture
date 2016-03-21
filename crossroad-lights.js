"use strict";
var constants = require("./lib/constants");
var LinkedLightsManager = require("./lib/linked-lights-manager");
var timeUtil = require("./lib/time-util");
var logger = require("./config/logger");
var dateFormat = require('dateformat');

// Start time of simulation
var startTime = new Date().getTime();

// Duration == 30 minutes as per exercise request
var duration = 30 * 60;

// Create our 'crossroad' manager
// Since exercise asks only for (NS) and (EW), a single LinkedLightsManager will suffice
var crossRoad = new LinkedLightsManager();

// Add the member traffic lights. Choosing to arbitrarily starting off (NS) as GREEN first
// Since it is a single manager, it is enough that the linked sets have the same
// initial status, opposed from the concurrent set.
crossRoad.addTrafficLight("North", constants.GREEN, checkError);
crossRoad.addTrafficLight("South", constants.GREEN, checkError);
crossRoad.addTrafficLight("West", constants.RED, checkError);
crossRoad.addTrafficLight("East", constants.RED, checkError);

// Timeset in which events will occur
var timeSlices;
timeUtil.sliceTime(startTime, duration, slices => {
    timeSlices = slices;
    checkError(timeSlices);
});

function start(timesSlices) {

    crossRoad.on('light-changed-colored', (name, color) => {
        logger.info(`${name} changed to ${color}`)
    });    
    for (var i = 0; i < timesSlices.length; i++) {
        logger.info('------------------------------------');
        logger.info(`=====> At: ${dateFormat(timesSlices[i], "h:MM:ss TT")}`);
        crossRoad.tick(checkError);
    }

}

// Fire it off
logger.info(`---- Starting time: ${dateFormat(startTime, "h:MM:ss TT")} ----`);
crossRoad.lights.forEach(function (light) {
    logger.info(light.currentState());
});
start(timeSlices);

// We have no room for mistakes here
function checkError(err) {
    if(err instanceof Error) {
        log.fatal('Something went horribly wrong. Exiting simulation', err);
        process.exit(1);
    }
}
