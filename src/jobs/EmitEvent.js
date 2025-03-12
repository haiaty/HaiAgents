'use strict';

const path = require("path");

module.exports =  async function (eventlabel, eventData = {}) {

    await logger.log('info', eventlabel, eventData);

    process.exit();

    //@todo push to db or event store (redis, etc..)

}