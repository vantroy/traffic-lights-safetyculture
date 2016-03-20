var expect = require("chai").expect;
var TrafficLight = require("../lib/traffic-light");
var CrossRoad = require("../lib/crossroad");

describe("the TrafficLight class", function () {


    describe("#selectColor method", function () {
        it("returns a colored string", function () {
            var crossRoad = new CrossRoad();
            var trafficLight = new TrafficLight("test", crossRoad, "RED");
            res = trafficLight.selectColor("RED");
            expect(res).to.equal("RED");
        })
    })
});



