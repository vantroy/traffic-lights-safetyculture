"use strict";
var constants = require("./lib/constants");
var LinkedLightsManager = require("./lib/linked-lights-manager");
var timeUtil = require("./lib/time-util");
var logger = require("./config/logger");
var dateFormat = require('dateformat');

/**
 *  This file is just a template to showcase the logic
 *  of {@link LinkedLightsManager} and {@link TrafficLight}
 *  It can be easily adapted to simulate traffic lights in real
 *  time or output a json object with changes, for example.
 */


/**
 * Start time of simulation as now */
var startTime = new Date().getTime();

/** Duration == 30 minutes as per exercise request
 * duration must be in seconds
 */
var duration = 30 * 60;

/**
 * Create our 'crossroad' manager
 * Since exercise asks only for (NS) and (EW), a single LinkedLightsManager will suffice
 * @type {LinkedLightsManager}
 */
var crossRoad = new LinkedLightsManager();

/**
 * Add the member traffic lights. Choosing to arbitrarily starting off (NS) as GREEN first
 * Since it is a single manager, it is enough that the linked sets have the same
 * initial status, opposed from the concurrent set.
 */
crossRoad.addTrafficLight("North", constants.GREEN, checkError);
crossRoad.addTrafficLight("South", constants.GREEN, checkError);
crossRoad.addTrafficLight("West", constants.RED, checkError);
crossRoad.addTrafficLight("East", constants.RED, checkError);

/**
 * Timeset in which events will occur. In a real world application a timer
 * would be used to fire the {@link LinkedLightsManager#tick};
 */
var timeSlices;
timeUtil.sliceTime(startTime, duration, slices => {
    timeSlices = slices;
    checkError(timeSlices);
});

/**
 * Simulation starter.
 * Once again, in a real world application, it should carry a timer instead of
 * an array with predefined times for {@link LinkedLightsManager#tick} to be called.
 * @param timesSlices
 */
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

/**
 * Let it exit with non zero status in case of error.
 * All points of failure are properly logged
 * 
 * @param err
 */
function checkError(err) {
    if(err instanceof Error) {
        log.fatal('Something went horribly wrong. Exiting simulation', err);
        process.exit(1);
    }
}
