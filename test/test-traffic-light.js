'use strict';
var expect = require('chai').expect;
var TrafficLight = require('../lib/traffic-light');
var LinkedLightsManager = require('../lib/linked-lights-manager');
var c = require('../lib/constants');
var sinom = require('sinon');

describe('in the TrafficLight class', function () {
    describe('inner #selectColor should', function () {

        it('return a colored string containing RED', function () {
            let trafficLight = new TrafficLight('test', c.RED, new LinkedLightsManager());
            let res = trafficLight.currentState();
            expect(res.indexOf('RED') > -1).to.be.ok;
        });

        it('return a colored string containing GREEN', function () {
            let trafficLight = new TrafficLight('test', c.GREEN, new LinkedLightsManager());
            let res = trafficLight.currentState();
            expect(res.indexOf('GREEN') > -1).to.be.ok;
        });

        it('return a colored string containing YELLOW', function () {
            let trafficLight = new TrafficLight('test', c.YELLOW, new LinkedLightsManager());
            let res = trafficLight.currentState();
            expect(res.indexOf('YELLOW') > -1).to.be.ok;
        });

    });

    describe('#printChanged() should', function () {
        it('print a helpful string', function () {
            let trafficLight = new TrafficLight('test', c.RED, new LinkedLightsManager());
            let res = trafficLight.printChanged();
            expect(res.indexOf('test changed to ' == 0)).to.be.ok;
        });
    });

    describe('inner #_register() should', function () {

        it('contain 1 registered listeners when init lit stat is NOT green', function () {
            let trafficLight = new TrafficLight('test', 'RED', new LinkedLightsManager());
            let numLights = trafficLight.linkedLightsManager.listenerCount('change-lights');
            let numYellow = trafficLight.linkedLightsManager.listenerCount('change-yellow');
            expect(numLights).to.equal(1);
            expect(numYellow).to.equal(0);
        });

        it('contain 2 registered listeners when init lit stat IS green', function () {
            let trafficLight = new TrafficLight('test', 'GREEN', new LinkedLightsManager());
            let numLights = trafficLight.linkedLightsManager.listenerCount('change-lights');
            let numYellow = trafficLight.linkedLightsManager.listenerCount('change-yellow');
            expect(numLights).to.equal(1);
            expect(numYellow).to.equal(1);
        });
    });

    describe('inner #_cycle()', function () {
        let manager = new LinkedLightsManager();
        let light = new TrafficLight('test', c.GREEN, manager);
        context('when initialized with name "test" and a GREEN light should', function () {

            it('cycle if "change-yellow" happens', function () {
                manager.emit('change-yellow');
                expect(light.lit).to.equal('YELLOW');
            });

            it('NOT cycle if "change-yellow" happens again', function () {
                manager.emit('change-yellow');
                expect(light.lit).to.equal('YELLOW');
            });

            it('cycle to RED on "change-lights" event', function () {
                manager.emit('change-lights');
                expect(light.lit).to.equal('RED');
            });

            it('cycle back to GREEN on next "change-lights"', function () {
                manager.emit('change-lights');
                expect(light.lit).to.equal('GREEN');
            });

            it('cycle back again to YELLOW on "change-yellow"', function () {
                manager.emit('change-yellow');
                expect(light.lit).to.equal('YELLOW');
            });

            it('emit an "error" event when lit state is corrupted with Error obj', function () {
                let manager = new LinkedLightsManager();
                new TrafficLight('test', 'INVALID COLOR', manager);
                let spy = sinom.spy(); 
                manager.on('error', spy);
                manager.emit('change-lights');
                expect(spy.calledWith(Error('Invalid type of currently lit color')))
                    .to.be.ok;
            });

            it('report completed state change on "light-changed" event with name and new lit state', function () {
                let manager = new LinkedLightsManager();
                let light = new TrafficLight('test', c.GREEN, manager);
                let spy = sinom.spy();                
                manager.on('light-changed', spy);                
                manager.emit('change-yellow');
                expect(spy.calledWith('test', 'YELLOW')).to.be.ok;
            });

            it('report completed state change on "light-changed-colored" event with name and new lit state', function () {
                let manager = new LinkedLightsManager();
                let light = new TrafficLight('test', c.GREEN, manager);
                let spy = sinom.spy();
                manager.on('light-changed-colored', spy);
                manager.emit('change-yellow');
                expect(spy.calledWith('test')).to.be.ok;
            });

        });
    });

});



