var winston = require("winston");

var logger = new winston.Logger({
    transports: [
        new winston.transports.Console({
            level: 'info',
            handleExceptions: true,
            json: false,
            colorize: true,
            timestamp: true
        })
    ],
    exitOnError: false
});

module.exports = logger;