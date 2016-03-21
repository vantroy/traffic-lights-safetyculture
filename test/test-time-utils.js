"use strict";

var expect = require('chai').expect;
var timeUtil = require("./../lib/time-util");
var config = require("./../config/time-config");

describe('in package time-util', function () {
    describe('#sliceTime should', function () {

       it('return an error if passed non numeric in start', function(done) {
            timeUtil.sliceTime('potato', 1, ret => {
                expect(ret).be.an.instanceOf(Error);
                done();
            });
       });

        it('return an error if passed non numeric in duration', function(done) {
            timeUtil.sliceTime(1, 'potato', ret => {
                expect(ret).be.an.instanceOf(Error);
                done();
            });
        });

        it('return an error if config object has inconsistent times', function(done) {
            config.cycleSeconds = 1;
            config.yellowSeconds = 2;
            timeUtil.sliceTime(1, 30, ret => {
                expect(ret).be.an.instanceOf(Error);
                done();
            });
        });

        it('return an array with timestamps when ticks must occur', function(done) {
            config.cycleSeconds = 10;
            config.yellowSeconds = 5;
            let expected = [5000, 10000, 15000, 20000, 25000, 30000];
            timeUtil.sliceTime(1, config.cycleSeconds * 3, ret => {
                expect(expected.length).to.equal(ret.length);
                for (var i = 0; i < ret.length; i++) {
                    expect(expected[i]).to.equal(ret[i]);                    
                }
                done();
            });
        });

        it('return an array with timestamps when ticks must occur, ' +
            'leaving out ticks out of simulation range', function(done) {
            config.cycleSeconds = 10;
            config.yellowSeconds = 5;
            let expected = [5000, 10000, 15000, 20000, 25000, 30000];
            timeUtil.sliceTime(1, config.cycleSeconds * 3 + 3, ret => {
                expect(expected.length).to.equal(ret.length);
                for (var i = 0; i < ret.length; i++) {
                    expect(expected[i]).to.equal(ret[i]);
                }
                done();
            });
        });


    });
});

