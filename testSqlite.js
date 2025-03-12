
'use strict'

const path = require("path");
const sqlite = require(path.join(process.cwd(), 'src', 'drivers', 'sqlite'));
const GetFormattedDatetimeJob = require(path.join(process.cwd(), 'src', 'jobs', 'GetFormattedDatetime'));

async function main() {

    let params = [Date.now(), 'an event', '{a: "ciao"}', GetFormattedDatetimeJob()];

    //console.log(await sqlite.insert('INSERT INTO events (date_at_milliseconds_timestamp, date_at, event_label, payload) VALUES (?,?,?,?)', params));

     await sqlite.truncate('events');
    process.exit();
}


main();