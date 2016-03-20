var log4js = require("log4js");
var chalk = require("chalk");
var c = require("./constants");

log4js.configure({
    appenders: [{type: "console"}]
});
var logger = log4js.getDefaultLogger();
log4js.replaceConsole(logger)

function TrafficLight(name, initialLitState, linkedLightsManager) {
    this.linkedLightsManager = linkedLightsManager;
    this.name = name;
    this.lit = initialLitState;
    this._register(linkedLightsManager);

}

TrafficLight.prototype._register = function (lightsManager) {
    lightsManager.on("change-lights", () => this._cycle());
    if (this.lit === c.GREEN) {
        this.linkedLightsManager.once("change-yellow", () => this._cycle());
    }
};

TrafficLight.prototype._cycle = function () {
    switch (this.lit) {
        case c.RED:

            // I was very tempted to only allow a RED to turn GREEN
            // only after other previous YELLOWs had completed cycling to RED
            // via a secondary event as a form of safety, but that would break
            // in the case of a single way Traffic Light. Let's assume
            // hardware won't break just for the purpose of this exercise.

            this.lit = c.GREEN; // <-- Spherical sheep in a vacuum.
            this.linkedLightsManager.once("change-yellow", () => this._cycle());
            break;
        case c.YELLOW:
            this.lit = c.RED;
            break;
        case c.GREEN:
            this.lit = c.YELLOW;
            break;
        default:
            logger.error("Unknown type of lit color. Check you traffic lights initialization code");
            return new Error("Invalid type of currently lit color");
    }
    logger.info(this._printChanged());
    return this.lit
};

TrafficLight.prototype._printChanged = function () {
    return `${this.name} changed to ${this._selectColor(this.lit)}`;
};


TrafficLight.prototype._selectColor = function (lit) {
    if (lit === c.GREEN) {
        return chalk.green(lit);
    } else if (lit === c.YELLOW) {
        return chalk.yellow(lit);
    } else {
        return chalk.red(lit);
    }
};


module.exports = TrafficLight;
