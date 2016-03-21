var chalk = require('chalk');
var c = require('./constants');
var logger = require("./../config/logger");

/**
 * Creates a new {TrafficLight}
 *
 * @param name - Name use as id of this instance
 * @param initialLitState - should be either GREEN or RED
 * @param linkedLightsManager - the {@Link LinkedLightsManager} who this intances will register listeners to
 * @constructor
 */
function TrafficLight(name, initialLitState, linkedLightsManager) {
    this._linkedLightsManager = linkedLightsManager;
    this._name = name;
    this._lit = initialLitState;
    this._register();
}

// Initialize listeners
TrafficLight.prototype._register = function () {
    this.linkedLightsManager.on('change-lights', () => this._cycle());
    if (this.lit === c.GREEN) {
        this.linkedLightsManager.once('change-yellow', () => this._cycle());
    }
};

// Will cycle trough the { GREEN -> YELLOW -> RED -> Repeat } states based on listeners and events fired by
// LinkedLightsManager passed in constructor 
TrafficLight.prototype._cycle = function () {
    
    // Emits an event to orchestrate changes. Not really used now, but will be useful to managed 
    // different sets of managers or implement safeguards, like only changing to green when opposing lights complete
    // cycling to RED
    var completedChange = function () {
        this.linkedLightsManager.emit('light-changed', this.name, this.lit);
        this.linkedLightsManager.emit('light-changed-colored', this.name, selectColor(this.lit)); // <-- Beutyfied        
    };
    switch (this.lit) {
        case c.RED:

            // I was very tempted to only allow a RED to turn GREEN 
            // only after other previous YELLOWs had completed cycling to RED
            // via a secondary event (see #completedChange above) as a form of safety, but that would break
            // in the case of a single way Traffic Light and would take control away from the linked lights manager. 
            // Let's assume hardware won't break just for the purpose of this exercise.

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

/**
 * Helps debugging
 * @returns {string}
 */
TrafficLight.prototype.printChanged = function () {
    return `${this.name} changed to ${selectColor(this.lit)}`;
};

/**
 * Retuns a string informing current state of traffic light
 * @returns {string}
 */
TrafficLight.prototype.currentState = function () {
    return `${this.name} has ${selectColor(this.lit)} light active.`
};

/**
 *  Returns a string with color coded terminal characters for pretty print. 
 *  
 * @param lit 
 * @returns {string}
 */
function selectColor(lit) {
    if (lit === c.GREEN) {
        return chalk.green(lit);
    } else if (lit === c.YELLOW) {
        return chalk.yellow(lit);
    } else {
        return chalk.red(lit);
    }
}

Object.defineProperty(TrafficLight.prototype, 'name', {
    /**
     * get name of this traffic light
     * @returns {string}
     */
    get: function() {
        return this._name;
    }
});

Object.defineProperty(TrafficLight.prototype, 'linkedLightsManager', {
    /**
     * get the manager this traffic lights registering listeners to.
     *
     * @returns {LinkedLightsManager}
     */
    get: function () {
        return this._linkedLightsManager;
    }
});

Object.defineProperty(TrafficLight.prototype, 'lit', {
    /**
     * get currently lit light.
     * @returns {string}
     */
    get: function() {
        return this._lit;
    }
    
});

module.exports = TrafficLight;
