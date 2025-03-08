// install duckB: npm install @duckdb/node-api
// for more see here: https://www.npmjs.com/package/@duckdb/node-api

'use strict'

const path = require("path");
const duckdb = require(path.join(process.cwd(), 'src', 'drivers', 'duckdb'));

async function main() {


    // Insert individual rows into the 'people' table
    await duckdb.insert("INSERT INTO people VALUES (1, 'Alice');");
    await duckdb.insert("INSERT INTO people VALUES (2, 'Bob');");



    // Query all rows from the 'people' table
    const reader = await duckdb.select('SELECT * FROM people;');



    //const rows = reader.getRows();
    const rows = await reader.getRowsJson();

// Iterate over the result set and log each row
    for (const row of rows) {
        console.log(row);
    }

}

main();