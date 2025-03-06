'use strict';

const path = require("path");
const logger = require(path.join(process.cwd(), 'src', 'drivers', 'logger'));


module.exports =  async function (eventlabel, eventData = {}) {

    await logger.log('info', eventlabel, eventData);

    console.log("logged");

    //@todo push to db or event store (redis, etc..)

}