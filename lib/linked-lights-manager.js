"use strict";

var util = require("util");
var EventEventEmitter = require("events").EventEmitter;
var c = require("./constants");
var TrafficLight = require("./traffic-light");
var logger = require("./logger");


function LinkedLightsManager() {
    EventEventEmitter.call(this);
    this._lights = new Map();
}

LinkedLightsManager.prototype.tick = function (callback) {
    if(this.listenerCount('change-yellow') > 0) {
        this.emit('change-yellow');
        callback('change-yellow');
    } else {
        this.emit('change-lights');
        callback('change-lights');
    }
};


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
    get: function () {
        return this._lights;
    }
});

module.exports = LinkedLightsManager;
