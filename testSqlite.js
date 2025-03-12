
'use strict'

const path = require("path");
const sqlite = require(path.join(process.cwd(), 'src', 'drivers', 'sqlite'));


async function main() {

    let eventsTable = `
            CREATE TABLE IF NOT EXISTS events (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                event_label TEXT NOT NULL,
                payload TEXT NOT NULL
            )
        `;

    console.log(await sqlite.insert('INSERT INTO events (event_label, payload) VALUES (?,?)', ['an event', '{a: "ciao"}']));
    process.exit();
}


main();