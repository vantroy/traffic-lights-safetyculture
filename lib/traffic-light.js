var log4js = require('log4js');
var chalk = require('chalk');
var c = require('./constants');

log4js.configure({
    appenders: [{type: 'console'}]
});
var logger = log4js.getDefaultLogger();
log4js.replaceConsole(logger);

function TrafficLight(name, initialLitState, linkedLightsManager) {
    this._linkedLightsManager = linkedLightsManager;
    this._name = name;
    this._lit = initialLitState;
    this._register();
}

TrafficLight.prototype._register = function () {
    this.linkedLightsManager.on('change-lights', () => this._cycle());
    if (this.lit === c.GREEN) {
        this.linkedLightsManager.once('change-yellow', () => this._cycle());
    }
};

TrafficLight.prototype._cycle = function () {
    var completedChange = function () {
        this.linkedLightsManager.emit('light-changed', this.name, this.lit);
    };
    switch (this.lit) {
        case c.RED:

            // I was very tempted to only allow a RED to turn GREEN
            // only after other previous YELLOWs had completed cycling to RED
            // via a secondary event as a form of safety, but that would break
            // in the case of a single way Traffic Light and would take control
            // away from the linked lights manager. Let's assume
            // hardware won't break just for the purpose of this exercise.

            this._lit = c.GREEN; // <-- Spherical sheep in a vacuum.
            this.linkedLightsManager.once('change-yellow', () => this._cycle());
            completedChange.call(this);            
            break;
        case c.YELLOW:
            this._lit = c.RED;
            completedChange.call(this);
            break;
        case c.GREEN:
            this._lit = c.YELLOW;
            completedChange.call(this);
            break;
        default:
            logger.error('Unknown type of lit color. Check you traffic lights initialization code');
            this.linkedLightsManager.emit('error', 
                Error('Invalid type of currently lit color'));
    }
    logger.debug(this.printChanged());
};

TrafficLight.prototype.printChanged = function () {
    return `${this.name} changed to ${selectColor(this.lit)}`;
};

TrafficLight.prototype.currentState = function () {
    return `${this.name} has ${selectColor(this.lit)} light active.`
};

function selectColor(lit) {
    if (lit === c.GREEN) {
        return chalk.green(lit);
    } else if (lit === c.YELLOW) {
        return chalk.yellow(lit);
    } else {
        return chalk.red(lit);
    }
}


// Getters: my Java developer sensibilities wont let me sleep at night
// if I just let other access 'private' vars
Object.defineProperty(TrafficLight.prototype, 'name', {
    get: function() {
        return this._name;
    }
});

Object.defineProperty(TrafficLight.prototype, 'linkedLightsManager', {
    get: function() {
        return this._linkedLightsManager;
    }
});

Object.defineProperty(TrafficLight.prototype, 'lit', {
    get: function() {
        return this._lit;
    }
    
});

module.exports = TrafficLight;
