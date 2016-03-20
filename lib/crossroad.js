var util = require("util");
var EventEventEmitter = require("events").EventEmitter;

function CrossRoad() {
    EventEventEmitter.call(this);
}

util.inherits(CrossRoad, EventEventEmitter);

CrossRoad.prototype.addLightSet = function (key, light) {
};

// CrossRoad.prototype.isTime() = function () {
//     emit()    
// }


module.exports = CrossRoad;
