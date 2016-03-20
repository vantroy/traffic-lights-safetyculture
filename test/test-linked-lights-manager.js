'use strict';
var expect = require('chai').expect;
var TrafficLight = require('../lib/traffic-light');
var LinkedLightsManager = require('../lib/linked-lights-manager');
var c = require('../lib/constants');
var sinom = require('sinon');


describe('in the LinkedLightsManager class', function () {
    describe('#addTrafficLight should', function () {

        it('create and save a new TrafficLight', function (done) {
            let manager = new LinkedLightsManager();
            manager.addTrafficLight("test1", c.GREEN, ret => {
                if(ret instanceof Error)
                    throw ret;
                expect(manager.lights.get("test1")).to.be.an.instanceOf(TrafficLight);
                done();
            });
        });

        it('return an Error if initLitLight is not one of the defined light type constants' +
            'GREEN or RED', function (done) {
            let manager = new LinkedLightsManager();
            manager.addTrafficLight("test1", 'YOLO', ret => {
                expect(ret).to.be.an.instanceOf(Error);
                done();
            });
        });

        it('return an Error if initLitLight was set to YELLOW', function (done) {
            let manager = new LinkedLightsManager();
            manager.addTrafficLight("test1", c.YELLOW, ret => {
                expect(ret).to.be.an.instanceOf(Error);
                done();
            });
        });

        it('return an Error if name is undefined', function (done) {
            let manager = new LinkedLightsManager();
            manager.addTrafficLight(null, c.RED, ret => {
                expect(ret).to.be.an.instanceOf(Error);
                done();
            });
        });

    });

    describe('#tick() should', function () {

        it('emit ONLY a "change-yellow" event and let us know if there are lights waiting for it', function (done) {
            let manager = new LinkedLightsManager();
            let yellowSpy = sinom.spy();
            let colorSpy = sinom.spy();
            manager.on('change-yellow', yellowSpy);
            manager.on('change-lights', colorSpy);
            manager.tick(ret => {
                expect(ret).to.be.equal('change-yellow');
                expect(yellowSpy.calledOnce).to.be.ok;
                expect(colorSpy.notCalled).to.be.ok;
                done();
            });
        });

        it('emit ONLY a "change-lights" event and let us know if there are no lights waiting for yellow', function (done) {
            let manager = new LinkedLightsManager();
            let spy = sinom.spy();
            manager.on('change-lights', spy);
            manager.tick(ret => {
                expect(ret).to.be.equal('change-lights');
                expect(spy.calledOnce).to.be.ok;
                done();
            });
        });        
        
    });

});




