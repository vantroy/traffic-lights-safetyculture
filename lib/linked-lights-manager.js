var util = require("util");
var EventEventEmitter = require("events").EventEmitter;

function LinkedLightsManager() {
    EventEventEmitter.call(this);
}

util.inherits(LinkedLightsManager, EventEventEmitter);

// CrossRoad.prototype.addLightSet = function (key, light) {
// };

// CrossRoad.prototype.isTime() = function () {
//     emit()    
// }


module.exports = LinkedLightsManager;
