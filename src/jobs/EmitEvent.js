'use strict';

const path = require("path");
const logger = require(path.join(process.cwd(), 'src', 'drivers', 'logger'));


module.exports =  async function (eventlabel, eventData = {}) {

    logger.log('info', eventlabel, eventData);

    //@todo push to db or event store (redis, etc..)

}