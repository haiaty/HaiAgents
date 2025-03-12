'use strict';

const path = require("path");
const sqlite = require(path.join(process.cwd(), 'src', 'drivers', 'sqlite'));
const GetFormattedDatetimeJob = require(path.join(process.cwd(), 'src', 'jobs', 'GetFormattedDatetime'));

module.exports =  async function (eventLabel, eventData = {}) {

    let params = [
        Date.now(),
        GetFormattedDatetimeJob(),
        eventLabel,
        JSON.stringify(eventData, null, 2),
        eventData.prompt
    ];

    await sqlite.insert('INSERT INTO events (date_at_milliseconds_timestamp, date_at, event_label, payload, prompt) VALUES (?,?,?,?,?)', params);

}