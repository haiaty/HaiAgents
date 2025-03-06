'use strict'

const path = require("path");

const { createLogger, format, transports } = require('winston')

let outputFile = path.join(process.cwd(), 'out', 'run.log');


const logger = createLogger({
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
    ),
    defaultMeta: { service: 'aiagent' },
    transports: [
        //
        // - Write to all logs with level `info` and below to `run.log`.
        //
        new transports.File({ filename: outputFile }),
        new transports.Console(),
    ]
});

module.exports = {

    // Winston's logging operations are asynchronous. So we wrap it up in a promise.
    log: async function(type, message, data) {
        return new Promise( (resolve, reject) => {
            logger.log(type, message, data)
        });
    }
};