"use strict";

var log4js = require("log4js");
var chalk = require("chalk");
var c = require("./constants");
var path = require("path");
// var CrossRoad = require("./crossroad");

log4js.configure({
    appenders: [{type: "console"}]
});
var logger = log4js.getDefaultLogger();
log4js.replaceConsole(logger)

class TrafficLight {

    constructor(name, initialLitState, crossroad) {
        this.crossroad = crossroad;
        initialLitState = !initialLitState ? c.RED : initialLitState;
        this.name = name;
        this.lit = initialLitState;
        this.crossroad.on("change-lights", function(){
            this.cycle();
        });
        if(initialLitState === c.GREEN) {
            this.crossroad.once("change-yellow", () => this.cycle());                        
        }        
    }

    cycle() {
        switch (this.lit) {
            case c.RED:
                this.lit = c.GREEN;
                logger.info(this.printChanged());
                this.crossroad.once("change-yellow", function () {
                    this.cycle()
                });
                return c.GREEN;
            case c.YELLOW:
                this.lit = c.RED;
                logger.info(this.printChanged());
                return c.RED;
            case c.GREEN:
                this.lit = c.YELLOW;
                logger.info(this.printChanged());
                return c.YELLOW;
            default:
                console.error("Unknown type of lit color. Check you traffic lights initialization code");
                return new Error("Invalid type of currently lit color");
        }
    }

    printChanged() {
        return `${this.name} changed to ${this.selectColor(this.lit)}`;
    };

    state() {
        logger.info(`${this.name} is currently ${this.selectColor(this.lit)}`);
    }

    selectColor(lit) {
        if(lit === c.GREEN) {
            return chalk.green(lit);
        } else if(lit === c.YELLOW) {
            return chalk.yellow(lit);
        } else {
            return chalk.red(lit);
        }
    }
}


module.exports = TrafficLight ;
