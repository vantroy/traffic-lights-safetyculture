"use strict";

var util = require("util");
var EventEventEmitter = require("events").EventEmitter;
var c = require("./constants");
var TrafficLight = require("./traffic-light");
var logger = require("./../config/logger");

/***
 *  LinkedLightsManager extends {@link EventEmitter} and is the coordinator of linked sets of traffic lights.
 *  More than one instance could be used to coordinate 3 ways intersections or non conventonal sets of
 *  traffic lights.
 *
 * @constructor
 */
function LinkedLightsManager() {
    EventEventEmitter.call(this);
    this._lights = new Map();
}

/**
 * Emits events to all registered {@Link TrafficLight}
 * Subsequent invocations should cycle lights trough the regular sequence of Green -> Yellow -> Red -> Green
 * and so on.
 *
 * @param callback - (string) name of the event that was emitted.
 */
LinkedLightsManager.prototype.tick = function (callback) {
    if(this.listenerCount('change-yellow') > 0) {
        this.emit('change-yellow');
        callback('change-yellow');
    } else {
        this.emit('change-lights');
        callback('change-lights');
    }
};

/**
 * Adds a new {@Link TrafficLight} to the managed set. The state of these are cycled via
 * {@Link LinkedLightsManager#tick}
 *
 * @param name - Name which will be used to ID this traffic light
 * @param initLitLight - Valid values are 'GREEN' or 'RED'. Any other value will result in {@Link Error}
 * @param callback - Will be called with null param in case of success or {@Link Error} in case of error
 */
LinkedLightsManager.prototype.addTrafficLight = function (name, initLitLight, callback) {
    if (name && (initLitLight === c.RED ||
        initLitLight === c.GREEN)) {
        this._lights.set(name, new TrafficLight(name, initLitLight, this));
        callback(null);
    } else if(initLitLight === c.YELLOW) {
        let error = new Error("YELLOW is not a valid initial light. Use RED or GREEN");
        logger.error('unable to add traffic light -', error);
        callback(error);
    } else {
        let error = new Error("Wrong parameters");
        logger.error(`unable to add traffic light Name: ${name}, light: ${initLitLight} -`, error);
        callback(error);
    }
};

util.inherits(LinkedLightsManager, EventEventEmitter);

Object.defineProperty(LinkedLightsManager.prototype, 'lights', {
    /**
     * getter for the currently managed lights
     * @returns {Map}
     */
    get: function () {
        return this._lights;
    }
});

module.exports = LinkedLightsManager;
