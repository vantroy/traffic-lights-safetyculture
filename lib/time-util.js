"use strict";
var config = require("./../config/time-config");
var logger = require("./../config/logger");

var timeUtil = module.exports = {

    /**
     * Receives simulation start timestamp and according to the settings in
     * config/time-config.js activates the callback with an array containing the exact timestamp
     * each tick() event must occur, or an error in case of exception.
     *
     * @param start - Timestamp (TS is always millis)
     * @param duration - int seconds
     * @param: array / error
     */
    sliceTime: function (start, duration, callback) {
        if (!(typeof start === "number") || !(typeof duration === "number")) {
            let err = new Error("invalid arguments: are not numbers");
            logger.error("Error slicing time", err);
            callback(err);
        } else if(config.cycleSeconds < config.yellowSeconds) {
            let err = new Error("Config error: cycle time is less than yellow light time");
            logger.error("Error in configuration - ", err);
            callback(err);
        } else {
            // We can ignore the Millis
            start = Math.floor(start / 1000);
            var result = [];

            var end = start + duration;
            var slice = start;
            while(slice <= end) {
                slice += (config.cycleSeconds - config.yellowSeconds);
                push(result, slice, end);
                slice += config.yellowSeconds;
                push(result, slice, end);
            }
            callback(result);            
        }
        
        function push(result, slice, end) {
            if(slice <= end) {
                result.push(slice * 1000); // <-- back to millis timestamp
            }
        }
    }

};