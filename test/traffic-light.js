"use strict";

var expect = require("chai").expect;
var TrafficLight = require("../lib/traffic-light");
var LinkedLightsManager = require("../lib/linked-lights-manager");
// var EventEmitter = require("events").EventEmitter;

describe("in the TrafficLight class", function () {

    var crossRoad = new LinkedLightsManager();
    var trafficLight = new TrafficLight("test", "RED", crossRoad);

    describe("#_selectColor should", function () {
        
        it("return a colored string containing RED", function () {
            let res = trafficLight._selectColor("RED");
            expect(res.indexOf('RED') > -1).to.be.ok;
        });
        
        it("return a colored string containing GREEN", function () {
            let res = trafficLight._selectColor("GREEN");
            expect(res.indexOf('GREEN') > -1).to.be.ok;
        })

        it("return a colored string containing YELLOW", function () {
            let res = trafficLight._selectColor("YELLOW");
            expect(res.indexOf('YELLOW') > -1).to.be.ok;
        })
        
    })
    
    describe("#_printChanged should", function () {
        it("print a helpful string", function () {
            let res = trafficLight.name;
            expect(res.indexOf("test changed to " == 0)).to.be.ok;
        })        
    })
    
    describe("#_register should", function () {
        it("contain 1 registered listeners when init lit stat is NOT green", function () {
            let trafficLight = new TrafficLight("test", "RED", new LinkedLightsManager());
            let numLights = trafficLight.linkedLightsManager.listenerCount("change-lights");
            let numYellow = trafficLight.linkedLightsManager.listenerCount("change-yellow");
            expect(numLights).to.equal(1);
            expect(numYellow).to.equal(0);
        });

        it("contain 2 registered listeners when init lit stat IS green", function () {
            let trafficLight = new TrafficLight("test", "RED", new LinkedLightsManager());
            let numLights = trafficLight.linkedLightsManager.listenerCount("change-lights");
            let numYellow = trafficLight.linkedLightsManager.listenerCount("change-yellow");
            expect(numLights).to.equal(1);
            expect(numYellow).to.equal(0);
        })
    })
    
    // describe("#_cycle")
    
});



